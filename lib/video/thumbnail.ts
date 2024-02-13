const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const { uploadToGCPCloud, generateVTT } = require("./uploader.ts");
const filePath = "/home/xcixor/Videos/comp.mp4";

let captions = new Array();
function createVideoThumbnails(
  filePath,
  numThumbnails,
  duration,
  i,
  destinationFolder,
) {
  return new Promise(async (resolve, reject) => {
    const outputPath = Date.now() + "thumbnail.png";

    const interval = duration / numThumbnails;

    let time;

    if (parseInt(i) === 0) {
      time = "00:00:01";
    } else {
      time = formatTime(i * interval);
    }
    let startTime = time;
    let endTime = formatTime((i + 1) * interval);

    const ffmpegCommand = ffmpeg(filePath)
      .seekInput(time)
      .format("mjpeg")
      .frames(1)
      .on("error", function (err) {
        console.log("An error occurred: " + err.message);
      })
      .on("end", function () {
        console.log("Processing finished for thumbnail " + (i + 1));
      });
    const stream = ffmpegCommand.pipe();

    const destination = `${destinationFolder}/${outputPath}`;
    const url = await uploadToGCPCloud(stream, destination);
    const fileName = `${destinationFolder}/captions.vtt`;
    await generateVTT(startTime, endTime, url, fileName);
    resolve(outputPath);
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

async function generateThumbnails(gcpDestinationFolder) {
  const duration = await getVideoDuration(filePath);

  try {
    for (let i = 0; i < numThumbnails; i++) {
      const gsLocation = process.env.GS_LOCATION;
      const destinationFolder = `${gsLocation}/${gcpDestinationFolder}`;
      const result = await createVideoThumbnails(
        filePath,
        numThumbnails,
        duration,
        i,
        destinationFolder,
      );
      console.log(result);
      // await sleep(200);
    }
  } catch (err) {
    console.log("An error occurred: " + err.message);
  } finally {
  }
}

generateThumbnails("test");
