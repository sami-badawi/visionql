import vision from '@google-cloud/vision';

const client = new vision.ImageAnnotatorClient();

const pathToImage = "gs://sami-vision-project/AI-panel-2018-02-15.jpg"

const request = {
  image: {
    source: {imageUri: pathToImage}
  }
};

function outputResponse(response: any) {
    try {
        console.log(response);
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
