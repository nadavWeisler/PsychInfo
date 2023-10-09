import {readJsonFile, writeJsonFile, parseParams, ORGSFILE} from "@/app/api/utils";
export function GET(request: any) {
    const orgs = readJsonFile(ORGSFILE);

    return Response.json(orgs)
}

export function POST(request: any) {
    const params = parseParams(request);
    console.log(params)
    let orgs = readJsonFile(ORGSFILE);
    // @ts-ignore
    orgs[params['orgid']] = params
    writeJsonFile(ORGSFILE, orgs);
    return Response.json(orgs)
}