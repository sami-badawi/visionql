import { expect } from "chai";

import SimpleQuery from "../src/SimpleQuery";
import { IFaceAnnotation } from "../src/api_respons_models";

describe("SimpleQuery", () => {
  it("SimpleQuery class instantiation", () => {
    const person = {name: "Sami"};
    const simpleQuery = new SimpleQuery("", person);
    expect(simpleQuery.data.name).equal("Sami");
  });

  it("Count all faces", async () => {
    const simpleQuery = new SimpleQuery("./output/example_face_detect_result.json");
    const topVision = await simpleQuery.castToTopVisionResponse();
    expect(topVision[0].faceAnnotations.length).equal(4);
  });

  it("Count all faces canned query", async () => {
    const simpleQuery = new SimpleQuery("./output/example_face_detect_result.json");
    const topVision = await simpleQuery.castToTopVisionResponse();
    expect(simpleQuery.faceCount()).equal(4);
  });

  it("Count happy faces", async () => {
    const simpleQuery = new SimpleQuery("./output/example_face_detect_result.json");
    const topVision = await simpleQuery.castToTopVisionResponse();
    expect(topVision[0].faceAnnotations.filter(
      (face: IFaceAnnotation) => {
        return face.joyLikelihood === "VERY_LIKELY";
      }).length ).equal(1);
  });

  it("Count happy faces canned query", async () => {
    const simpleQuery = new SimpleQuery("./output/example_face_detect_result.json");
    const topVision = await simpleQuery.castToTopVisionResponse();
    expect(simpleQuery.happyFaceCount()).equal(1);
  });

  it("Count happy faces", async () => {
    const simpleQuery = new SimpleQuery("./output/wakeupcat_jpg/label_detect_result.json");
    const topVision = await simpleQuery.castToTopVisionResponse();
    expect(topVision[0].labelAnnotations.length).equal(10);
  });
});
