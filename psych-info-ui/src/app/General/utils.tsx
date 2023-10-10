import { Organization, StringObject, Tag } from "./interfaces";

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

export function isEmptyOrSpaces(str: string) {
    return str === null || str.match(/^ *$/) !== null || str === "\r";
}
