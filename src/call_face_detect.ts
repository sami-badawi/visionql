import vision from "@google-cloud/vision";
import * as argparse from "argparse";
import output_result from "./output_result";
import SimpleQuery from "./SimpleQuery";

const pathToImageDefault = "gs://sami-vision-project/AI-panel-2018-02-15.jpg";

async function outputResponse(response: any, pathToImage: string) {
    try {
        const responseJson = JSON.stringify(response);
        console.log(responseJson);
        const outputFile = await output_result.writeResultData(response, "face_detect_result.json", pathToImage);
        const faceAnnotations: any[] = response[0].faceAnnotations;
        console.log("faceAnnotations.length", faceAnnotations.length);
        console.log("First face found:\n", faceAnnotations[0]);
        return outputFile;
    } catch (err) {
        console.log("err", err);
    }
}

async function callFaceDetect(pathToImage: string, query: string) {
  const request = {
    image: {
      source: {imageUri: pathToImage}
    }
  };
  try {
    const client = new vision.ImageAnnotatorClient();
    const response = await client.faceDetection(request);
    const outputFile = await outputResponse(response, pathToImage);
    if (query && outputFile) {
      const simpleQuery = new SimpleQuery(outputFile);
      const topVision = await simpleQuery.castToTopVisionResponse();
      const faceCount = simpleQuery.faceCount();
      const happyFaceCount = simpleQuery.happyFaceCount();
      console.log(`for image: ${pathToImage}: faceCount: ${faceCount}; happyFaceCount: ${happyFaceCount}`);
    }
  }  catch (err) {
    console.error(err);
  }
}

const parser = new argparse.ArgumentParser({
  addHelp: true,
  description: "Call GCP Vision API for image label."
});
parser.addArgument("--gs_path", {
  defaultValue: pathToImageDefault,
  help: "Path to which the model will be saved after training.",
  type: "string"
});
parser.addArgument("--query", {
  help: "Run query after doing API call",
  type: "string"
});

const args = parser.parseArgs();

console.log(`Processing: ${args.gs_path}`);

callFaceDetect(args.gs_path, args.query);
