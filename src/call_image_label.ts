import output_result from "./output_result";
import SimpleQuery from "./SimpleQuery";

import * as argparse from "argparse";

// Imports the Google Cloud client library
import vision from "@google-cloud/vision";

// Creates a client
const client = new vision.ImageAnnotatorClient();

async function runLabelDetection(imageFile: string, query: string) {
  try {
    const outputDir = output_result.path2ResultDir(imageFile);
    const results: any[] = await client.labelDetection(imageFile);
    const responseJson = JSON.stringify(results);

    const outputFile = await output_result.writeResultData(results, "label_detect_result.json", imageFile);
    console.log("The result file has been saved!\n");
    console.log(results);
    const labels = results[0].labelAnnotations;

    console.log("Labels for first result:");
    labels.forEach((label: any) => console.log(label.description));

    if (query && outputFile) {
      const simpleQuery = new SimpleQuery(outputFile);
      const topVision = await simpleQuery.castToTopVisionResponse();
      const isMeme = simpleQuery.isMeme();
      const hasCat = simpleQuery.hasCat();
      const hasDog = simpleQuery.hasDog();
      console.log(`for image: ${imageFile}: isMeme: ${isMeme}, hasCat: ${hasCat}, hasDog: ${hasDog}`);
    }
  } catch (err) {
    console.error("ERROR:", err);
  }
}

const parser = new argparse.ArgumentParser({
  addHelp: true,
  description: "Call GCP Vision API for image label."
});
parser.addArgument("--file_path", {
  defaultValue: "./resources/wakeupcat.jpg",
  help: "Path to which the model will be saved after training.",
  type: "string"
});
parser.addArgument("--query", {
  help: "Run query after doing API call",
  type: "string"
});
const args = parser.parseArgs();

runLabelDetection(args.file_path, args.query);
