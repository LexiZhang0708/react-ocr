import React, { useEffect, useState } from 'react';
import './App.css';
import { createWorker, createScheduler } from 'tesseract.js';

const scheduler = createScheduler()

const useTakeWebcamStream = ({video}: {video: HTMLVideoElement | null}) => {
  useEffect(() => {
    if (video) {
      const handleSuccess = (stream: any) => {
        // Attach the video stream to the video element and autoplay.
        video.srcObject = stream;
      }; 
      navigator.mediaDevices.getUserMedia({
          video: true
        }).then(handleSuccess);
    }
  }, [video])
}

const useTesseract = () => {
  useEffect(() => {
    (async () => {
      for (let i = 0; i < 4; i++) {
        const worker = createWorker();
        await worker.load();
        await worker.loadLanguage("eng");
        await worker.initialize("eng");
        scheduler.addWorker(worker);
      }
    })();
  }, [])
}

const doOCR = async (canvas: HTMLCanvasElement): Promise<string> => {
  const {
    data: { text }
  } = await scheduler.addJob("recognize", canvas);
  return text;
};

// TODO: use video height and width for snapshot
function App() {
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const [snapShotRef, setSnapShotRef] = useState<HTMLCanvasElement | null>(null);
  const [results, setResults] = useState<string>("");
  useTakeWebcamStream({video: videoRef});
  useTesseract();
  return (
    <div className="App">
      <button id="capture" onClick={() => {
        if (videoRef && snapShotRef) {
          // @ts-ignore
          snapShotRef.getContext("2d").drawImage(videoRef, 0, 0, 320, 240)
          doOCR(snapShotRef).then(setResults);
        }
      }}>
        Capture Image
      </button>
      <video id="video" controls autoPlay ref={setVideoRef}>
      </video>
      <canvas id="snapShot" width="320" height="240" ref={setSnapShotRef}>
      </canvas>
      <div id="results">
        {results}
      </div>
    </div>
  );
}

export default App;
