const ffmpeg = require("fluent-ffmpeg");
const { uploadToGCPCloud, generateVTT, clearFolder } = require("./uploader.ts");

function createVideoThumbnails(
  file,
  numThumbnails,
  duration,
  i,
  destinationFolder,
) {
  return new Promise(async (resolve) => {
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

    const ffmpegCommand = ffmpeg(file)
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
    const vttfileName = `${destinationFolder}/captions.vtt`;
    await generateVTT(startTime, endTime, url, vttfileName);
    resolve(vttfileName);
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

function getVideoDuration(file) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(file, (err, metadata) => {
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

async function generateThumbnails(gcpDestinationFolder, file) {
  const gsLocation = process.env.GS_LOCATION;
  const destinationFolder = `${gsLocation}/${gcpDestinationFolder}`;
  await clearFolder(destinationFolder);
  const duration = await getVideoDuration(file);
  try {
    for (let i = 0; i < numThumbnails; i++) {
      await createVideoThumbnails(
        file,
        numThumbnails,
        duration,
        i,
        destinationFolder,
      );
    }
    return { message: "Success", status: 200 };
  } catch (err) {
    console.log("An error occurred: " + err.message);
    return { message: "Error", status: 500 };
  } finally {
  }
}

module.exports = { generateThumbnails };
