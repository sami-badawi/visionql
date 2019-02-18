import * as argparse from "argparse";

// Imports the Google Cloud client library
import vision from "@google-cloud/vision";

// Creates a client
const client = new vision.ImageAnnotatorClient();

async function runLabelDetection(imageFile: string) {
  try {
    const results: any[] = await client.labelDetection(imageFile);
    console.log(results);
    const labels = results[0].labelAnnotations;

    console.log("Labels:");
    labels.forEach((label: any) => console.log(label.description));
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
const args = parser.parseArgs();

runLabelDetection(args.file_path);
