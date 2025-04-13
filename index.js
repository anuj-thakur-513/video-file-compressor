/**
 * provide a video file path
 * stream the video to FFMPEG
 * reduce the file size using FFMPEG
 */

import ffmpeg from "fluent-ffmpeg";

(async function () {
  const filePath = process.argv[2];
  if (!filePath) {
    return;
  }
  const fileNameWithExtension = filePath.split("/").pop();
  const fileExtension = fileNameWithExtension.split(".").pop();
  const fileName = fileNameWithExtension.split(".").shift();

  ffmpeg(filePath)
    .outputOptions(["-c:v", "libx264", "-crf", "28", "-preset", "medium"])
    .output(`${fileName}_compressed_medium.${fileExtension}`)
    .on("start", () => {
      console.log("processing started");
    })
    .on("progress", (progress) => {
      console.log(`${progress.percent.toFixed(2)}% completed`);
    })
    .on("end", () => {
      console.log("video processed successfully");
    })
    .on("error", (err) => {
      console.error("Error while processing video", err);
    })
    .run();
})();
