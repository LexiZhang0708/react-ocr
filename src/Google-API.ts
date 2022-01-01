import {google} from "@google-cloud/vision/build/protos/protos";

const vision = require('@google-cloud/vision');

async function doGoogleOcr(fileName: string){
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    let recognized_text: string[] = []
    // Performs text detection on the local file
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    console.log('Text:');
    if (detections) {
        detections.forEach((text: google.cloud.vision.v1.IEntityAnnotation) => console.log(text));
        detections.forEach((text: google.cloud.vision.v1.IEntityAnnotation) => recognized_text.push(text.description!));
    }
    return recognized_text;
}

export default doGoogleOcr;

console.log()