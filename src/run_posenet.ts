import * as posenet from "@tensorflow-models/posenet";
import * as tf from "@tensorflow/tfjs-node";
import * as argparse from "argparse";

import get_image_data from "get-image-data";
// import get_image_data from "get-image-data/native";
// const image = require('get-image-data/native');

class PoseNetRunner {

    public net: posenet.PoseNet;
    protected dirty = true;

    public async init() {
        try {
            console.log(`====== Start init()`);
            const net = await posenet.load();
            console.log(`====== In init(): net: ${net}`);
            this.net = net;
            this.dirty = false;
            return net;
        } catch (err) {
            this.dirty = true;
            console.log(`init() error: ${err}`);
        }
    }

    public async singlePose(imagefile: string) {
        console.log(`Start singlePose`);
        const imageScaleFactor = 0.50;
        const flipHorizontal = false;
        const outputStride = 16;

        let imageElement: ImageData;
        try {

        const typeString = typeof get_image_data;
        console.log(`typeString: ${typeString}`);

        get_image_data(imagefile, (err, info) => {
            if (err) {
                console.log(`============== err: ${err}`);
            }
            const data = info.data;
            const height = info.height;
            const width = info.width;
            // for (var i = 0, l = data.length; i < l; i += 4) {
            //   var red = data[i];
            //   var green = data[i + 1];
            //   var blue = data[i + 2];
            //   var alpha = data[i + 3];
            // }
            imageElement = info;
            console.log(`====== info read: ${imagefile}, height: ${height}, width: ${width}`);
            console.log(`====== this.net: ${this.net}`);
            if (this.dirty) {
                // tslint:disable-next-line:no-empty
                this.init().then(() => {
                }).catch((raeason) => {
                    console.log(`Fail in init() ${raeason}`);
                });
            }
            const posePromis = this.net.estimateSinglePose(
                imageElement, imageScaleFactor, flipHorizontal, outputStride);
            posePromis.then((pose) => {
                const poseJson = JSON.stringify(pose);
                console.log(poseJson);
            }, (reason) => {
                console.log(`reason: ${reason}`);
            });
          });
        } catch (err2) {
            console.log(`err2: ${err2}`);
        }
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
        await poseNetRunner.singlePose(args.file_path);
        console.log(`Done with image: ${args.file_path}`);
    } catch (err) {
        console.log(`err: ${err}`);
    }
}

run();
