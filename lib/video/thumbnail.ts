const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const uploadToGCPCloud = require("./uploader.ts");
const filePath = "/home/xcixor/Videos/comp.mp4";

// function createVideoThumbnail(filePath) {
//   const outputPath = Date.now() + "thumbnail.png";
//   const outStream = fs.createWriteStream(outputPath);

//   const time = `00:00:15`;
//   ffmpeg(filePath)
//     .seekInput(time)
//     .format("mjpeg") // -f mjpeg
//     .frames(1) // -vframes 1
//     // .size("1920x1080") // -s 320x240 : w = 320, h = 240
//     .on("error", function (err) {
//       console.log("An error occurred: " + err.message);
//     })
//     .on("end", function () {
//       console.log("Processing finished !");
//     })
//     .pipe(outStream, { end: true });
// }

function createVideoThumbnails(filePath, numThumbnails, duration, i) {
  return new Promise((resolve, reject) => {
    const outputPath = Date.now() + "thumbnail.png";

    const interval = duration / numThumbnails;

    let time = formatTime(i * interval);

    if (i === 0) {
      time = "00:00:01";
    }
    const ffmpegCommand = ffmpeg(filePath)
      .seekInput(time)
      .format("mjpeg")
      .frames(1)
      .on("error", function (err) {
        console.log("An error occurred: " + err.message);
      })
      .on("end", function () {
        console.log("Processing finished for thumbnail " + (i + 1));
        resolve(outputPath);
      });
    const stream = ffmpegCommand.pipe();
    const gsLocation = process.env.GS_LOCATION;
    const destination = `${gsLocation}/test/${outputPath}`;
    uploadToGCPCloud(stream, destination);
  });
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
}

function padZero(num) {
  return num.toString().padStart(2, "0");
}

function getVideoDuration(videoPath) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) {
        reject(err);
        return;
      }

      const duration = metadata.format.duration;
      const durationInSeconds = Math.round(duration);

      resolve(durationInSeconds);
    });
  });
}

const numThumbnails = 5;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateThumbnails() {
  const duration = await getVideoDuration(filePath);
  console.log(duration);
  try {
    for (let i = 0; i < numThumbnails; i++) {
      createVideoThumbnails(filePath, numThumbnails, duration, i);
      await sleep(500);
    }
  } catch (err) {
    console.log("An error occurred: " + err.message);
  }
}

generateThumbnails();
