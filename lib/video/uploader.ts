const { Storage } = require("@google-cloud/storage");
const path = require("path");
const gsBucketName = process.env.GS_PUBLIC_BUCKET_NAME;
const gsLocation = process.env.GS_LOCATION;
console.log(gsBucketName, gsLocation);
// Initialize storage
const storage = new Storage({ keyFilename: process.env.GS_CREDENTIALS });
const bucket = storage.bucket(gsBucketName);
// Sending the upload request

// function uploadToGCPCloud(fileToUpload, destination) {
//   bucket.upload(
//     fileToUpload,
//     {
//       destination: destination,
//     },
//     function (err, file) {
//       if (err) {
//         console.error(`Error uploading image image_to_upload.jpeg: ${err}`);
//       } else {
//         console.log(`Image image_to_upload.jpeg uploaded to ${gsBucketName}.`);
//         console.log(file.publicUrl());
//         // Making file public to the internet
//         file.makePublic(async function (err) {
//           if (err) {
//             console.error(`Error making file public: ${err}`);
//           } else {
//             console.log(`File ${file.name} is now public.`);
//             const publicUrl = file.publicUrl();
//             console.log(`Public URL for ${file.name}: ${publicUrl}`);
//           }
//         });
//       }
//     },
//   );
// }
// const fileToUpload = `/home/xcixor/Pictures/bsaka.jpeg`;
// const fileName = path.basename(fileToUpload);
// const gcpFile = `${gsLocation}/test/${fileName}`;

// uploadToGCPCloud(fileToUpload, gcpFile);


function uploadToGCPCloud(stream, destination) {
  return new Promise((resolve, reject) => {
    const file = bucket.file(destination);
    const writeStream = file.createWriteStream();

    stream.pipe(writeStream)
      .on('error', (err) => {
        reject(err);
      })
      .on('finish', () => {
        console.log(`Image uploaded to ${gsBucketName}.`);
        console.log(file.publicUrl());
        // Making file public to the internet
        file.makePublic(async function (err) {
          if (err) {
            reject(err);
          } else {
            console.log(`File ${file.name} is now public.`);
            const publicUrl = file.publicUrl();
            console.log(`Public URL for ${file.name}: ${publicUrl}`);
            resolve(publicUrl);
          }
        });
      });
  });
}

module.exports = uploadToGCPCloud;

