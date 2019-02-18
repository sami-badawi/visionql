import * as fs from "fs-extra";

import * as api_respons_models from "./api_respons_models";

export default class SimpleQuery {
  public static addition(a: number, b: number): number {
    return a + b;
  }

  constructor(public filename?: string, public data?) {
  }

  public async loadData() {
    try {
      const res = await fs.readJson(this.filename);
      // const jsonString = JSON.stringify(res);
      // console.log(`======= data: ${jsonString}`);
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
      console.log(`======= data: ${jsonString}`);
      this.data = res;
    }
  }

  public async castToTopVisionResponse(): Promise<api_respons_models.IApiVisionResponse> {
    await this.init();
    console.log(`======= this.data: ${this.data}`);
    return this.data[0] as api_respons_models.IApiVisionResponse;
  }
}
