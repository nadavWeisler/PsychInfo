import {
    Filter,
    Organization,
    Tag,
} from "@/app/[lng]/general/interfaces";

export function ListContainsById(StringObjectList: Tag[] | Organization[], id: string): boolean {
    return StringObjectList.some((item) => item.id === id);
}

export function GetAllDisplays(StringObjectList: Tag[] | Organization[]): string[] {
    return StringObjectList.map((item) => item.display);
}

export const EMPTY_TAG: Tag = {
    id: "",
    display: "",
    used: false,
    languageId: "",
};

export const EMPTY_ORGANIZATION: Organization = {
    id: "",
    display: "",
    used: false,
    languageId: "",
};

export function GetFilters(): Filter[] {
    const filterFile = require("./filters.json");
    let filters: Filter[] = filterFile.filters;
    return filters;
}

export function isEmptyOrSpaces(str: string): boolean {
    console.log(str);
    return str === null || str?.match(/^ *$/) !== null || str === "\r";
}

export function ifValidLink(url: string): boolean {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
}

