import {
    DisplayLanguages,
    Filter,
    Organization,
    Tag,
} from "@/app/[lng]/general/interfaces";

export function ListContainsById(StringObjectList: Tag[] | Organization[], id: string): boolean {
    return StringObjectList.some((item) => item.id === id);
}

export function GetAllDisplays(StringObjectList: Tag[] | Organization[], languageId: string): string[] {
    return StringObjectList.map((item) => getStringObjectDisplay(item, languageId));
}

export const EMPTY_TAG: Tag = {
    id: "",
    heDisplay: "",
    enDisplay: "",
    arbDisplay: "",
    rusDisplay: "",
    used: false,
};

export const EMPTY_ORGANIZATION: Organization = {
    id: "",
    heDisplay: "",
    enDisplay: "",
    arbDisplay: "",
    rusDisplay: "",
    used: false,
};

export function GetFilters(): Filter[] {
    const filterFile = require("./filters.json");
    let filters: Filter[] = filterFile.filters;
    return filters;
}

export function isEmptyOrSpaces(str: string): boolean {
    return str === null || str?.match(/^ *$/) !== null || str === "\r";
}

export function ifValidLink(url: string): boolean {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
}

export function getStringObjectDisplay(object: Tag | Organization, languageId: string): string {
    console.log(object);
    switch (languageId) {
        case "he":
            return object.heDisplay;
        case "en":
            return object.enDisplay;
        case "arb":
            return object.arbDisplay;
        case "rus":
            return object.rusDisplay;
        default:
            return object.heDisplay
    }
}

