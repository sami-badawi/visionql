import vision from "@google-cloud/vision";
import * as fs from "fs";

const pathToImageDefault = "gs://sami-vision-project/AI-panel-2018-02-15.jpg";

async function outputResponse(response: any) {
    try {
        const responseJson = JSON.stringify(response);
        console.log(responseJson);
        await fs.writeFile("./output/face_detect_result.json", responseJson, (err) => {
          if (err) {
            throw err;
          }
          console.log("The file has been saved!");
        });
        const faceAnnotations: any[] = response[0].faceAnnotations;
        console.log("faceAnnotations.length", faceAnnotations.length);
        console.log("First face found:\n", faceAnnotations[0]);
    } catch (err) {
        console.log("err", err);
    }
}

async function callFaceDetect(pathToImage: string) {
  const request = {
    image: {
      source: {imageUri: pathToImage}
    }
  };
  try {
    const client = new vision.ImageAnnotatorClient();
    const response = await client.faceDetection(request);
    await outputResponse(response);
  }  catch (err) {
    console.error(err);
  }
}

callFaceDetect(pathToImageDefault);
