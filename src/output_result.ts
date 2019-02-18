import * as fs from "fs-extra";

export class OutputResult {
    constructor(public baseDir: string = "output") {

    }

    public path2Filename(fullPath: string): string {
        const filename = fullPath.replace(/^.*[\\\/]/, "");
        return filename;
    }

    /**
     * Store all results in a
     * @param fullImagePath
     */
    public path2ResultDir(fullImagePath: string): string {
        const endDir = this.path2Filename(fullImagePath).replace(".", "_");
        return `${this.baseDir}/${endDir}`;
    }

    public async writeResultData(data: any, filename: string, fullImagePath: string) {
        const outputDir = this.path2ResultDir(fullImagePath);
        const outputFile = `${outputDir}/${filename}`;
        try {
            fs.ensureDir(outputDir);
            await fs.writeJson(outputFile, data);
            console.log(`Finished writing to ${outputFile}`);
        } catch (err) {
            console.log(`Failed writing to ${outputFile}. ${err}`);
        }
    }
}

export default new OutputResult();
