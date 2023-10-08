import fs from "fs";

export function readJsonFile(filePath: string) {
    const file = fs.readFileSync(filePath);
    return JSON.parse(file.toString());
}