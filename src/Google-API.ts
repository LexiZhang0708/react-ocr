import {google} from "@google-cloud/vision/build/protos/protos";

const vision = require('@google-cloud/vision');

async function doGoogleOcr(){
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    const fileName = '/Users/xizhang/Desktop/Chinese.jpg';
    let recognized_text: google.cloud.vision.v1.IEntityAnnotation[] = []
    // Performs text detection on the local file
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    console.log('Text:');
    if (detections) {
        detections.forEach((text: google.cloud.vision.v1.IEntityAnnotation) => console.log(text));
        detections.forEach((text: google.cloud.vision.v1.IEntityAnnotation) => recognized_text.push(text));
    }
    return recognized_text;
}

doGoogleOcr()


console.log()