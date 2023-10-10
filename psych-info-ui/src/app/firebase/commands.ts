import { get, push, ref, set } from "firebase/database";
import { db, dbPaths } from "./app";
import { Content, Language, Organization, Tag } from "../general/interfaces";

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
            console.log('No data available');
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function getAllOrganizations(used: boolean): Promise<Organization[]> {
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
            console.log('No data available');
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function getAllLanguages(used: boolean): Promise<Language[]> {
    try {
        const snapshot = await get(ref(db, dbPaths.languages));
        if (snapshot.exists()) {
            const languages: Language[] = Object.values(snapshot.val());
            if (used) {
                return Object.values(languages).filter((item) => item.used === used);
            } else {
                return Object.values(languages);
            }
        } else {
            console.log('No data available');
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function getContent(organizations: Organization[], tags: Tag[]): Promise<Content[]> {
    try {
        const snapshot = await get(ref(db, dbPaths.content));
        if (snapshot.exists()) {
            const content: Content[] = Object.values(snapshot.val());
            return Object.values(content).filter((item) => {
                if (item.organization) {
                    return organizations.some((organization) => organization.id === item.organization.id);
                } else {
                    return false;
                }
            }).filter((item) => {
                if (item.tags) {
                    return tags.some((tag) => item.tags.includes(tag));
                } else {
                    return false;
                }
            });
        } else {
            console.log('No data available');
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export function createTag(tag: Tag): Promise<void> {
    try {
        const newTagRef = push(ref(db, dbPaths.allTags));
        return set(newTagRef, tag);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export function createOrganization(organization: Organization): Promise<void> {
    try {
        const newOrganizationRef = push(ref(db, dbPaths.allOrganizations));
        return set(newOrganizationRef, organization);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export function updateUsedTags(tags: Tag[]): Promise<void> {
    tags = tags.map((tag) => {
        tag.used = true;
        return tag;
    });
    try {
        return set(ref(db, dbPaths.allTags), tags);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export function createContent(content: Content): Promise<void> {
    try {
        const newContentRef = push(ref(db, dbPaths.validateContent));
        updateUsedTags(content.tags);
        return set(newContentRef, content);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
