import fs from "fs";
import { Content, Organization, Tag } from "../general/interfaces";

export function readJsonFile(filePath: string) {
    const file = fs.readFileSync(filePath);
    return JSON.parse(file.toString());
}

export function readOrginizationsFile(filePath: string): Organization[] {
    const file = fs.readFileSync(filePath);
    const orginizations: Organization[] = JSON.parse(file.toString());
    return orginizations;
}

export function writeOrginizationsFile(filePath: string, orginizations: Organization[]): void {
    const orginizationsJson = JSON.stringify(orginizations, null, 4);
    fs.writeFileSync(filePath, orginizationsJson);
}

export function readTagsFile(): Tag[] {
    const file = fs.readFileSync(TAGS_FILE);
    const tags: Tag[] = JSON.parse(file.toString());
    return tags;
}

export function writeTagsFile(filePath: string, tags: Tag[]): void {
    const tagsJson = JSON.stringify(tags, null, 4);
    fs.writeFileSync(filePath, tagsJson);
}

export function writeJsonFile(filePath: string, data: any) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}

export function getContentFromRequest(request: Request) : Content {
    const params: Map<string, any> = parseParams(request);
    const content: Content = {
        title: params.get('title') || '',
        description: params.get('description') || '',
        link: params.get('link') || '',
        tags: params.get('tags')?.split(',') || [],
        organization: params.get('organizations') || [],
        language: params.get('language') || '',
    }
    return content;
}

export function parseParams(request: any) : Map<string, string> {
    const paramsString = request.url.split("?")[1]
    const eachParamArray = paramsString.split('&');
    let params = new Map<string, string>();
    eachParamArray.forEach((param: string) => {
        const key: string = param.split('=')[0];
        params.set(key, param.split('=')[1]);
    })
    return params;
}

export function getNewTagFromRequest(request: Request) : Tag {
    const params: Map<string, string> = parseParams(request);
    const tag: Tag = {
        id: params.get('id') || '', 
        display: params.get('displayName') || '',
        used: false   
    }
    return tag;
}

export function getNewOrgFromRequest(request: Request) : Organization {
    const params: Map<string, string> = parseParams(request);
    const org: Organization = {
        id: params.get('id') || '', 
        display: params.get('displayName') || '',
        used: false   
    }
    return org;
}



export const DATA_FILE = './psych-info-ui/src/data/tags.json';
export const TAGS_FILE = '../../data/tags.json';
export const ORGS_FILE = '../data/orgs.json';