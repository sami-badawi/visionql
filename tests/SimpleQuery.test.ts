import { expect } from "chai";
import C from "../src/SimpleQuery";

describe("SimpleQuery", () => {
  it("addition", () => {
    const result = C.addition(1, 2);
    expect(result).equal(3);
  });
});
