import vision from '@google-cloud/vision';
import * as fs from 'fs';

const client = new vision.ImageAnnotatorClient();

const pathToImage = "gs://sami-vision-project/AI-panel-2018-02-15.jpg"

const request = {
  image: {
    source: {imageUri: pathToImage}
  }
};

function outputResponse(response: any) {
    try {
        const responseJson = JSON.stringify(response);
        console.log(responseJson);
        fs.writeFileSync("./output/face_detect_result.json", responseJson);
        const faceAnnotations: any[] = response[0]["faceAnnotations"];
        console.log("faceAnnotations.length", faceAnnotations.length);
        console.log("First face found:\n", faceAnnotations[0]);
    }
    catch (err) {
        console.log("err", err);
    }
}

client
  .faceDetection(request)
  .then(response => {
    outputResponse(response)
  })
  .catch(err => {
    console.error(err);
  });
