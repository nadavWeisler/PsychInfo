import { Organization, Tag } from "./interfaces";

export const getTags = () => {
    return ["tag1", "tag2", "tag3"];
};

export const getOrganizations = () => {
    return ["org1", "org2", "org3"];
};

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
