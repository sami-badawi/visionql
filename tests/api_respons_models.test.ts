import { expect } from "chai";
import {IPoint2D, IPoint3D} from "../src/api_respons_models";

describe("IPoint3D", () => {
  it("extract x", () => {
    const point3D: IPoint3D = {
        "x": 672.4509887695312,
        "y": 469.4596862792969,
        "z": -0.00043755306978709996
      };
    expect(672.4509887695312).equal(point3D.x);
  });

  it("extract x from JSON", () => {
        const pointJson = `{
            "x": 672.4509887695312,
            "y": 469.4596862792969,
            "z": -0.00043755306978709996
        }`;
        const point3D = JSON.parse(pointJson) as IPoint3D;
        expect(672.4509887695312).equal(point3D.x);
    });

  it("extract y", () => {
    const point3D: IPoint3D = {
        x: 672.4509887695312,
        y: 469.4596862792969,
        z: -0.00043755306978709996
      };
    expect(469.4596862792969).equal(point3D.y);
  });
});
