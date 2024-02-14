const { Storage } = require("@google-cloud/storage");
const path = require("path");
const gsBucketName = process.env.GS_PUBLIC_BUCKET_NAME;
const gsLocation = process.env.GS_LOCATION;
// Initialize storage
const storage = new Storage({ keyFilename: process.env.GS_CREDENTIALS });
const bucket = storage.bucket(gsBucketName);

function uploadToGCPCloud(stream, destination) {
  return new Promise((resolve, reject) => {
    const file = bucket.file(destination);
    const writeStream = file.createWriteStream();

    stream
      .pipe(writeStream)
      .on("error", (err) => {
        reject(err);
      })
      .on("finish", () => {
        // Making file public to the internet
        file.makePublic(async function (err) {
          if (err) {
            reject(err);
          } else {
            const publicUrl = file.publicUrl();
            resolve(publicUrl);
          }
        });
      });
  });
}

// Cloud Function entry point
async function generateVTT(startTime, endTime, url, fileName) {
  try {
    // Generate the VTT content
    const vttContent = generateVTTContent(startTime, endTime, url);
    // Get the existing VTT file content from GCP
    const existingContent = await getFileContent(gsBucketName, fileName);

    // Append the new VTT content to the existing content
    const updatedContent = existingContent + vttContent;
    // Write the updated VTT content to the GCP file
    await writeFileContent(gsBucketName, fileName, updatedContent);
    // console.log("VTT file created successfully!");
  } catch (error) {
    console.error("Error generating VTT file:", error);
  }
}

// Function to get the existing file content from GCP
async function getFileContent(bucketName, fileName) {
  const file = storage.bucket(bucketName).file(fileName);

  try {
    const [content] = await file.download();
    return content.toString();
  } catch (error) {
    if (error.code === 404) {
      console.log(`File ${fileName} not found in bucket ${bucketName}`);
    }
    throw error;
  }
}

// Function to write the updated file content to GCP
async function writeFileContent(gsBucketName, fileName, content) {
  const file = storage.bucket(gsBucketName).file(fileName);
  await file.save(content, {
    contentType: "text/vtt",
    resumable: false,
    validation: false,
  });
}

// Function to generate the VTT content
function generateVTTContent(startTime, endTime, url) {
  return `${startTime} --> ${endTime}\n${url}\n\n`;
}

async function makeFilePublic(fileName) {
  const file = bucket.file(`${gsLocation}/${fileName}`);

  // Make the file public
  await file.makePublic();
  const publicUrl = file.publicUrl();

  return publicUrl;
}

async function clearFolder(folder) {
  // List all objects in the folder
  const [files] = await bucket.getFiles({ prefix: folder });

  // Delete each file within the folder
  await Promise.all(files.map((file) => file.delete()));

  // Delete the empty folder
  await bucket.deleteFiles({ prefix: folder, force: true });
}

module.exports = { uploadToGCPCloud, generateVTT, makeFilePublic, clearFolder };
