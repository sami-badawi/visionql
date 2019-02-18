import { expect } from "chai";
import SimpleQuery from "../src/SimpleQuery";

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

  it("SimpleQuery class instantiation", async () => {
    const person = {name: "Sami"};
    const simpleQuery = new SimpleQuery("/Users/samibadawi/samicode/visionql/output/example_face_detect_result.json");
    const topVision = await simpleQuery.castToTopVisionResponse();
    expect(topVision.faceAnnotations.length).equal(4);
  });
});
