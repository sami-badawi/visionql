import * as fs from "fs-extra";

import * as api_respons_models from "./api_respons_models";

export default class SimpleQuery {

  /**
   * @param input top level input coming from Google Vision API
   */
  public static castToIApiVisionResponseArray(input: any): api_respons_models.IApiVisionResponse[] {
    return input as api_respons_models.IApiVisionResponse[];
  }

  public apiVisionResponseArray: api_respons_models.IApiVisionResponse[] = undefined;

  constructor(public filename?: string, public data?, public verboseLogging?: boolean) {
  }

  public async loadData() {
    try {
      const res = await fs.readJson(this.filename);
      return res;
    } catch (err) {
      console.log(`Error reading ${this.filename}. ${err}`);
      return null;
    }
  }

  public async init() {
    if (this.filename) {
      console.log(`Start read from ${this.filename}`);
      const res = await this.loadData();
      const jsonString = JSON.stringify(res);
      if (this.verboseLogging) {
        console.log(`======= data: ${jsonString}`);
      }
      this.data = res;
    }
  }

  public async castToTopVisionResponse(): Promise<api_respons_models.IApiVisionResponse[]> {
    await this.init();
    if (this.verboseLogging) {
      console.log(`======= this.data: ${this.data}`);
    }
    this.apiVisionResponseArray = SimpleQuery.castToIApiVisionResponseArray(this.data);
    return this.apiVisionResponseArray;
  }

  /**
   * Example of canned query
   */
  public faceCount(): number {
    const firstResult = this.apiVisionResponseArray[0];
    return firstResult.faceAnnotations.length;
  }

  public happyFaceCount(): number {
    const firstResult = this.apiVisionResponseArray[0];
    return firstResult.faceAnnotations.filter( (face) => face.joyLikelihood === "VERY_LIKELY").length;
  }

  public hasCat(): boolean {
    const firstResult = this.apiVisionResponseArray[0];
    return 0 <= firstResult.labelAnnotations.findIndex((label) => label.description === "Cat");
  }

  public hasDog(): boolean {
    const firstResult = this.apiVisionResponseArray[0];
    return 0 <= firstResult.labelAnnotations.findIndex((label) => label.description === "Dog");
  }

  public isMeme(): boolean {
    const firstResult = this.apiVisionResponseArray[0];
    return 0 <= firstResult.labelAnnotations.findIndex((label) => label.description === "Internet meme");
  }
}
