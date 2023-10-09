import {readJsonFile, writeJsonFile, parseParams, TAGSFILE} from "@/app/api/utils";
export function GET(request: any) {
    const tags = readJsonFile(TAGSFILE);

    return Response.json(tags)
}

export function POST(request: any) {
    const params = parseParams(request);
    console.log(params)
    let tags = readJsonFile(TAGSFILE);
    // @ts-ignore
    params['used'] = false;
    // @ts-ignore
    tags[params['tagid']] = params
    writeJsonFile(TAGSFILE, tags);
    return Response.json(tags)
}