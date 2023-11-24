// import { Storage } from "@google-cloud/storage";
// import { env } from "./env";
const { Storage } = require("@google-cloud/storage");
// const { env } = require("./env");

// interface Props {
//   objectToUpload: string;
//   customLocation?: string;
// }

function generateSignedUrl(objectToUpload = "stripe.ts", customLocation = "") {
  //   The ID of your GCS bucket
  const gsBucketName = process.env.GS_BUCKET_NAME;
  const gsLocation = process.env.GS_LOCATION;
  //   The full path of your file inside the GCS bucket, e.g. 'yourFile.jpg' or 'folder1/folder2/yourFile.jpg'
  let fileName;
  customLocation
    ? (fileName = `${gsLocation}/${customLocation}/${objectToUpload}`)
    : (fileName = `${gsLocation}/${objectToUpload}`);

  const storage = new Storage({ keyFilename: process.env.GS_CREDENTIALS });

  async function generateV4UploadSignedUrl() {
    const options = {
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType: "application/octet-stream",
    };

    // Get a v4 signed URL for uploading file
    const [url] = await storage
      .bucket(gsBucketName)
      .file(fileName)
      .getSignedUrl(options);

    console.log("Generated PUT signed URL:");
    console.log(url);
    console.log("You can use this URL with any user agent, for example:");
    console.log(
      "curl -X PUT -H 'Content-Type: application/octet-stream' " +
        `--upload-file my-file '${url}'`,
    );
  }

  generateV4UploadSignedUrl().catch(console.error);
}

generateSignedUrl();
