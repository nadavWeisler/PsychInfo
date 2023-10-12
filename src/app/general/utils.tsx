import {
    Filter,
    Organization,
    StringObject,
    Tag,
} from "@/app/general/interfaces";

export function ListContainsById(
    StringObjectList: Tag[] | Organization[] | StringObject[],
    id: string
): boolean {
    return StringObjectList.some((item) => item.id === id);
}

export function GetAllDisplays(
    StringObjectList: Tag[] | Organization[] | StringObject[]
): string[] {
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

export function isEmptyOrSpaces(str: string) {
    return str === null || str.match(/^ *$/) !== null || str === "\r";
}

export function ifValidLink(url: string): boolean {
    // Regular expression to match a valid URL
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    // Test the URL against the pattern
    return urlPattern.test(url);
}

