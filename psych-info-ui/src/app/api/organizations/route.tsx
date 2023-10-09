import { ORGS_FILE, readOrginizationsFile, getNewOrgFromRequest, writeOrginizationsFile } from "@/app/api/utils";

export function GET() {
    const orgs = readOrginizationsFile(ORGS_FILE);
    return Response.json(orgs)
}

export function POST(request: Request) {
    const newOrgainization = getNewOrgFromRequest(request);
    let orgs = readOrginizationsFile(ORGS_FILE);
    orgs.push(newOrgainization);
    writeOrginizationsFile(ORGS_FILE, orgs);
    return Response.json(orgs)
}