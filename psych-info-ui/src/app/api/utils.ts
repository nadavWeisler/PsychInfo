import fs from "fs";

export function readJsonFile(filePath: string) {
    const file = fs.readFileSync(filePath);
    return JSON.parse(file.toString());
}

export function writeJsonFile(filePath: string, data: any) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}

export function parseParams(request: any) {
    const paramsString = request.url.split("?")[1]
    const eachParamArray = paramsString.split('&');
    let params = {};
    eachParamArray.forEach((param: string) => {
        const key = param.split('=')[0];
        // @ts-ignore
        params[key] = param.split('=')[1];
    })
    return params;
}

export const DATAFILE = 'C:\\Users\\User\\WebstormProjects\\PsychInfo\\psych-info-ui\\src\\data\\data.json';
export const TAGSFILE = 'C:\\Users\\User\\WebstormProjects\\PsychInfo\\psych-info-ui\\src\\data\\tags.json';
export const ORGSFILE = 'C:\\Users\\User\\WebstormProjects\\PsychInfo\\psych-info-ui\\src\\data\\organizations.json';