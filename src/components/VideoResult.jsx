import { transcriptionItemsToSrt } from "@/app/libs/awsTranscribHelpers";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";
import { useEffect, useState, useRef } from "react";
import SparksIcon from "./SparksIcon";
import { Roboto } from "next/font/google";
import roboto from "../../public/roboto.ttf";
import arial from "../../public/arial.ttf";

export default function VideoResult({ filename, transcriptionItems }) {
  const videoUrl = "https://yosef-captions.s3.amazonaws.com/" + filename;
  const [loaded, setLoaded] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#FFFFFF");
  const [outlineColor, setOutlineColor] = useState("#000000");
  const [progress, setProgress] = useState(1);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.src = videoUrl;
    load();
  }, []);

  // let roboUrl = "src\app\fonts\Roboto-Bold.ttf"

  const load = async () => {
    const ffmpeg = ffmpegRef.current;
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd";
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    await ffmpeg.writeFile("/tmp/roboto.ttf", await fetchFile(roboto));
    await ffmpeg.writeFile("/tmp/arial.ttf", await fetchFile(arial));
    setLoaded(true);
  };
  function toFFmpegColor(rgb) {
    const bgr = rgb.slice(5, 7) + rgb.slice(3, 5) + rgb.slice(1, 3);
    return "&H" + bgr + "&";
  }

  const transcode = async () => {
    const ffmpeg = ffmpegRef.current;
    const srt = transcriptionItemsToSrt(transcriptionItems);
    console.log("filename:", filename);
    console.log(await ffmpeg.listDir("/tmp"));

    await ffmpeg.writeFile("subs.srt", srt);
    await ffmpeg.writeFile(filename, await fetchFile(videoUrl));

    videoRef.current.src = videoUrl;
    await new Promise((resolve, reject) => {
      videoRef.current.onloadedmetadata = resolve;
    });
    const duration = videoRef.current.duration;
    ffmpeg.on("log", ({ message }) => {
      const regexResult = /time=([0-9:.]+)/.exec(message);
      if (regexResult && regexResult?.[1]) {
        const howMuchIsDone = regexResult?.[1];
        const [hours, minutes, seconds] = howMuchIsDone.split(":");
        const doneTotalSeconds = hours * 3600 + minutes * 60 + seconds;
        const videoProgress = doneTotalSeconds / duration;
        setProgress(videoProgress);
      }
    });

    ffmpeg.on("log", ({ message }) => {
      console.log(message);
    });
    // fontfile=C\\:\\\\Windows\\\\Fonts\\\\ariblk.ttf

    await ffmpeg.exec([
      "-i",
      filename,
      "-vf",
      `subtitles=subs.srt:fontsdir=/tmp:force_style='FontSize=30,MarginV=70,PrimaryColour=${toFFmpegColor(
        primaryColor
      )},OutlineColour=${toFFmpegColor(outlineColor)}'`,
      "-c:a",
      "copy",
      "-preset",
      "ultrafast",
      "output.mp4",
    ]);

    // await ffmpeg.exec([
    //   "-i",
    //   filename,
    //   "-vf",
    //   "ass=subtitle.ass",
    //   "output_ass.mp4",
    // ]);

    const data = await ffmpeg.readFile("output.mp4");
    videoRef.current.src = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );
    setProgress(1);
  };

  return (
    <>
      <div className="mb-4">
        <button
          onClick={transcode}
          className="bg-gray-200 text-black py-2 px-6 rounded-full inline-flex gap-2 border-2 border-black/80 font-bold cursor-pointer"
        >
          <SparksIcon />
          <span>Apply captions</span>
        </button>
      </div>
      <div>
        primary color:
        <input
          type="color"
          value={primaryColor}
          onChange={(ev) => setPrimaryColor(ev.target.value)}
        />
        <br />
        outline color:
        <input
          type="color"
          value={outlineColor}
          onChange={(ev) => setOutlineColor(ev.target.value)}
        />
      </div>
      <div className="rounded-xl overflow-hidden relative">
        {progress && progress < 1 && (
          <div className="absolute inset-0 bg-black/80 flex items-center">
            <div className="w-full text-center">
              <div className="bg-bg-gradient-from/50 mx-8 rounded-lg overflow-hidden relative">
                <div
                  className="bg-gradient-to-b from-blue-600 to-gray-400 h-8"
                  style={{ width: progress * 100 + "%" }}
                >
                  <h3 className="text-white text-xl absolute inset-0 py-1">
                    {parseInt(progress * 100)}%
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}
        <video data-video={0} ref={videoRef} controls></video>
      </div>
    </>
  );
}
