import { expect } from "chai";

import SimpleQuery from "../src/SimpleQuery";
import { IFaceAnnotation } from "../src/api_respons_models";

describe("SimpleQuery", () => {
  it("addition dummy test", () => {
    const result = SimpleQuery.addition(1, 2);
    expect(result).equal(3);
  });

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

  it("Count happy faces", async () => {
    const simpleQuery = new SimpleQuery("./output/example_face_detect_result.json");
    const topVision = await simpleQuery.castToTopVisionResponse();
    expect(topVision[0].faceAnnotations.filter(
      (face: IFaceAnnotation) => face.joyLikelihood === "VERY_LIKELY").length ).equal(1);
  });

  it("Count happy faces", async () => {
    const simpleQuery = new SimpleQuery("./output/wakeupcat_jpg/label_detect_result.json");
    const topVision = await simpleQuery.castToTopVisionResponse();
    expect(topVision[0].labelAnnotations.length).equal(10);
  });
});
