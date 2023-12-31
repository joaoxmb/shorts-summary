import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoID) =>
  new Promise((resolve, reject) => {
    const videoURL = `https://www.youtube.com/shorts/${videoID}`;

    ytdl(videoURL, {
      quality: "lowestaudio",
      filter: "audioonly"
    }).on("info", (info) => {
      const seconds = parseFloat(info.formats[0].approxDurationMs) / 1000;

      if (seconds <= 60) {
        console.log("é um shorts")
      } else {
        throw new Error("Este video não é um shorts!")
      }
    })
    .on("end", () => {
      console.log("Download do video concluido!");
      resolve();
    })
    .on("error", (error) => {
      console.log(error);
      reject(error);
    })
    .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })