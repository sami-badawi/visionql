import * as posenet from "@tensorflow-models/posenet";
import * as tf from "@tensorflow/tfjs-node";
import * as argparse from "argparse";

import get_image_data from "get-image-data";
// import get_image_data from "get-image-data/native";
// const image = require('get-image-data/native');

class PoseNetRunner {

    public net: posenet.PoseNet;

    public async init() {
        const net = await posenet.load();
        console.log(`====== In init(): net: ${net}`);
        this.net = net;
        return net;
    }

    public async singlePose(imagefile: string) {
        const imageScaleFactor = 0.50;
        const flipHorizontal = false;
        const outputStride = 16;

        let imageElement: ImageData;

        get_image_data(imagefile, (err, info) => {
            // const data = info.data;
            // const height = info.height;
            // const width = info.width;
            // for (var i = 0, l = data.length; i < l; i += 4) {
            //   var red = data[i];
            //   var green = data[i + 1];
            //   var blue = data[i + 2];
            //   var alpha = data[i + 3];
            // }
            imageElement = info;
          });

        console.log(`this.net: ${this.net}`);
        const pose = await this.net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride);
        const poseJson = JSON.stringify(pose);
        console.log(poseJson);
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

async function run() {
    try {
        const args = parser.parseArgs();
        console.log(`Start with image: ${args.file_path}`);
        const poseNetRunner = new PoseNetRunner();
        await poseNetRunner.init();
        await poseNetRunner.singlePose(args.file_path);
        console.log(`Done with image: ${args.file_path}`);
    } catch (err) {
        console.log(`err: ${err}`);
    }
}

run();
