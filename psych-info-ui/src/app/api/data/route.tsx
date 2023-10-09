import {readJsonFile, writeJsonFile, parseParams, DATA_FILE} from "@/app/api/utils";
export function GET(request: any) {
    const params: {} = parseParams(request);
    // @ts-ignore
    let tags = params["tags"].split(',')
    const data = readJsonFile(DATA_FILE);
    let res = [];
    for (let key in data) {
        for (let j = 0; j < tags.length; j++) {
            if (data[key]['tags'].split(",").includes(tags[j])) {
                res.push(data[key]);
            }
        }
    }
    return Response.json(res);
}