import { Filter, Language, Organization, StringObject, Tag } from "@/app/general/interfaces";

export function ListContainsById(StringObjectList: Tag[] | Organization[] | StringObject[], id: string): boolean {
    return StringObjectList.some((item) => item.id === id);
}

export function GetAllDisplays(StringObjectList: Tag[] | Organization[] | StringObject[]): string[] {
    return StringObjectList.map((item) => item.display);
}

export const EMPTY_TAG: Tag = {
    id: "",
    display: "",
    used: false,
};

export const EMPTY_ORGANIZATION: Organization = {
    id: "",
    display: "",
    used: false,
};

export const EMPTY_LANGUAGE: Language = {
    id: "",
    display: "",
    used: false
};

export function GetFilters(): Filter[] {
    const filterFile = require("./filters.json");
    const filters: Filter[] = filterFile.filters;
    return filters;
}

export function isEmptyOrSpaces(str: string) {
    return str === null || str.match(/^ *$/) !== null || str === "\r";
}
