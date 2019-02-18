
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
}

export default new OutputResult();
