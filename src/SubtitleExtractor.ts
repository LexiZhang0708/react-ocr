import doGoogleOcr from "./Google-API"
import fs from 'fs'
import path from 'path'
import {execSync} from 'child_process'

// const frame_folder_path = "/Users/xizhang/Desktop/chinese_sub/cropped_frames";
const video_path = "/Users/xizhang/Desktop/chinese_sub2";

async function extractSubtitle(video_path: string) {
    // crop bottom half of video
    execSync('ffmpeg -i ./chinesesub.mp4 -filter:v "crop=in_w:in_h/2:in_w:in_h/2" -c:a copy out.mp4',
       {cwd: video_path})
    // make a folder and extract individual frames
    execSync('mkdir cropped_frames', {cwd: video_path});
    execSync('ffmpeg -i out.mp4 ./cropped_frames/img%04d.png', {cwd: video_path})

    const frame_folder_path = path.join(video_path, "cropped_frames")

    const frame_names = fs.readdirSync(frame_folder_path)
    let subtitles: string[] = []
    for (let i = 0; i < frame_names.length; i++) {
        if (i === 78) {
            const frameName = frame_names[i];
            const recognized_text = await doGoogleOcr(path.join(frame_folder_path, frameName));
            // const results = JSON.stringify(recognized_text)
            subtitles.push(...recognized_text.map(x => x.trim()))
        }
    }
    const subtitlesjson = JSON.stringify(subtitles)
    fs.writeFileSync(path.join(video_path, "results.json"), subtitlesjson)
    // remove frames
    execSync('rm -rf ./cropped_frames', {cwd: video_path})

    // remove cropped video
    execSync('rm ./out.mp4', {cwd: video_path})
};

extractSubtitle(video_path);

export default extractSubtitle;