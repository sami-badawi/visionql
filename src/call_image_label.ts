// Imports the Google Cloud client library
import vision from "@google-cloud/vision";

// Creates a client
const client = new vision.ImageAnnotatorClient();

// Performs label detection on the image file
client
  .labelDetection("./resources/wakeupcat.jpg")
  .then((results: any[] ) => {
    const labels = results[0].labelAnnotations;

    console.log("Labels:");
    labels.forEach((label: any) => console.log(label.description));
  })
  .catch((err: Error) => {
    console.error("ERROR:", err);
  });
