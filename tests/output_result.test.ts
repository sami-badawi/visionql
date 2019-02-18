import { expect } from "chai";
import output_result from "../src/output_result";

describe("output_result", () => {
  it("path2Filename", () => {
    const result = output_result.path2Filename("resources/wakeupcat.jpg");
    expect(result).equal("wakeupcat.jpg");
  });

  it("path2ResultDir", () => {
    const result = output_result.path2ResultDir("resources/wakeupcat.jpg");
    expect(result).equal("output/wakeupcat_jpg");
  });
});
