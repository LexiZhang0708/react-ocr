import doGoogleOcr from "./Google-API"
import fs from 'fs'
import path from 'path'
const frame_folder_path = "/Users/xizhang/Desktop/chinese_sub/cropped_frames";

async function extractSubtitle(frame_folder_path: string) {
    fs.readdir(frame_folder_path, (err, frame_names) => {
        if (err)
            console.log(err);
        else {
            frame_names.forEach(name => {
                if (name === "img0079.png") {
                    doGoogleOcr(path.join(frame_folder_path, name));
                }
            })
        }
    })
};

extractSubtitle(frame_folder_path);

export default extractSubtitle;