import {readJsonFile} from "@/app/api/utils";
export function GET() {
    const tags = readJsonFile('C:\\Users\\User\\WebstormProjects\\PsychInfo\\psych-info-ui\\src\\data\\tags.json');

    return Response.json(tags)
}