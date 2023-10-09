import { TAGS_FILE, getNewTagFromRequest, readTagsFile, writeTagsFile } from "@/app/api/utils";
export function GET(request: Request) {
    const tags = readTagsFile();
    console.log(tags);
    return Response.json(tags)
}

export function POST(request: Request) {
    let tags = readTagsFile();
    const newTag = getNewTagFromRequest(request);
    tags.push(newTag);
    writeTagsFile(TAGS_FILE, tags);
    return Response.json(tags)
}