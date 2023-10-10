import { get, push, ref, set, remove } from "firebase/database";
import { db, dbPaths } from "./app";
import {
    Content,
    Language,
    Operator,
    Organization,
    Tag
} from "@/app/general/interfaces";

export async function getAllTags(used: boolean): Promise<Tag[]> {
    try {
        const snapshot = await get(ref(db, dbPaths.allTags));
        if (snapshot.exists()) {
            const tags: Tag[] = Object.values(snapshot.val());
            if (used) {
                return Object.values(tags).filter((item) => item.used === used);
            } else {
                return Object.values(tags);
            }
        } else {
            console.log("No data available");
            return [];
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export async function getAllOrganizations(
    used: boolean
): Promise<Organization[]> {
    try {
        const snapshot = await get(ref(db, dbPaths.allOrganizations));
        if (snapshot.exists()) {
            const tags: Organization[] = Object.values(snapshot.val());
            if (used) {
                return Object.values(tags).filter((item) => item.used === used);
            } else {
                return Object.values(tags);
            }
        } else {
            console.log("No data available");
            return [];
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export async function getAllLanguages(used: boolean): Promise<Language[]> {
    try {
        const snapshot = await get(ref(db, dbPaths.languages));
        if (snapshot.exists()) {
            const languages: Language[] = Object.values(snapshot.val());
            if (used) {
                return Object.values(languages).filter(
                    (item) => item.used === used
                );
            } else {
                return Object.values(languages);
            }
        } else {
            console.log("No data available");
            return [];
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export async function getContent(
    organizations: Organization[],
    tags: Tag[],
    Languages: Language[],
    operator: Operator
): Promise<Content[]> {
    try {
        const snapshot = await get(ref(db, dbPaths.content));
        if (snapshot.exists()) {
            const content: Content[] = Object.values(snapshot.val());
            return Object.values(content).filter((item) => {
                let org = false;
                let tag = false;
                let lang = false;
                if (organizations.length > 0) {
                    org = organizations.some(
                        (organization) =>
                            item.organization.id === organization.id
                    );
                } else {
                    org = true;
                }
                if (tags.length > 0) {
                    tag = tags.some((tag) =>
                        item.tags.some((contentTag) => contentTag.id === tag.id)
                    );
                } else {
                    tag = true;
                }
                if (Languages.length > 0) {
                    lang = Languages.some(
                        (language) => item.language.id === language.id
                    );
                } else {
                    lang = true;
                }
                if (operator === Operator.AND) {
                    return org && tag && lang;
                } else {
                    return org || tag || lang;
                }
            });
        } else {
            console.log("No data available");
            return [];
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export function createTag(tag: Tag): Promise<void> {
    try {
        const newTagRef = push(ref(db, dbPaths.allTags));
        return set(newTagRef, tag);
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export function createOrganization(organization: Organization): Promise<void> {
    try {
        const newOrganizationRef = push(ref(db, dbPaths.allOrganizations));
        return set(newOrganizationRef, organization);
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export async function updateUsed(newContent: Content): Promise<void> {
    const newTags: Tag[] = newContent.tags.map((tag) => {
        tag.used = true;
        return tag;
    });
    const newOrganization: Organization = {
        ...newContent.organization,
        used: true,
    };
    const newLanguage: Language = { ...newContent.language, used: true };
    try {
        await set(ref(db, dbPaths.allTags), newTags);
        await set(ref(db, dbPaths.allOrganizations), newOrganization);
        await set(ref(db, dbPaths.languages), newLanguage);
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export async function createContent(content: Content): Promise<void> {
    try {
        const newContentRef = await push(ref(db, dbPaths.validateContent));
        updateUsed(content);
        return await set(newContentRef, content);
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export const getPendingContent = async (): Promise<Content[]> => {
    try {
        const snapshot = await get(ref(db, dbPaths.pendingContent));
        if (snapshot.exists()) {
            const x = Object.values(snapshot.val() || {}) as Array<
                Record<string, unknown>
            >;

            const preContent = Object.values(snapshot.val() || {}) as Array<
                Record<string, unknown>
            >;

            const content: Content[] = preContent.map(
                (item) => Object.values(item)[0] as Content
            );
            return content;
        } else {
            console.log("No data available");
            return [];
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const postPendingContent = async (content: Content): Promise<void> => {
    try {
        const newContentRef = await push(
            ref(db, dbPaths.pendingContent + "/" + content.title)
        );
        return await set(newContentRef, content);
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const deletePendingContent = async (title: string): Promise<void> => {
    try {
        const contentRef = ref(db, `${dbPaths.pendingContent}/${title}`);
        await remove(contentRef);
    } catch (error) {
        console.error("Error:", error);
    }
};
