import { get, push, ref, set, remove, update, DataSnapshot } from "firebase/database";
import { db, dbPaths } from "./app";
import {
    Content,
    Operator,
    Organization,
    Tag,
    FoundMistakeDB,
    FoundMistake,
    ContentDB,
} from "@/app/[lng]/general/interfaces";

export async function getAllTags(used: boolean, langId: string): Promise<Tag[]> {
    try {
        const snapshot: DataSnapshot = await get(ref(db, dbPaths.allTags));
        if (snapshot.exists()) {
            let tags: Tag[] = Object.values(snapshot.val());
            tags = tags.filter((item) => item.languageId === langId);
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

export async function getAllOrganizations(used: boolean, langId: string): Promise<Organization[]> {
    try {
        const snapshot: DataSnapshot = await get(ref(db, dbPaths.allOrganizations));
        if (snapshot.exists()) {
            let org: Organization[] = Object.values(snapshot.val());
            org = org.filter((item) => item.languageId === langId);
            if (used) {
                return Object.values(org).filter((item) => item.used === used);
            } else {
                return Object.values(org);
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
    Languages: string[],
    operator: Operator
): Promise<Content[]> {
    try {
        const snapshot: DataSnapshot = await get(ref(db, dbPaths.validateContent));
        if (snapshot.exists()) {
            const content: Content[] = Object.values(snapshot.val());
            const data = Object.values(content).filter((item) => {
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
                        (language) => item.languageId === language
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
            return data;
        } else {
            console.log("No data available");
            return [];
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export async function createTag(tag: Tag): Promise<void> {
    try {
        const newTagRef = await push(ref(db, dbPaths.allTags));
        return await set(newTagRef, tag);
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export async function createOrganization(organization: Organization): Promise<void> {
    try {
        const newOrganizationRef = await push(ref(db, dbPaths.allOrganizations));
        return await set(newOrganizationRef, organization);
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

    const tags = await get(ref(db, dbPaths.allTags));
    const organizations = await get(ref(db, dbPaths.allOrganizations));

    const tagPathArray: string[] = [];
    newContent.tags.forEach((tag) => {
        const tagKeys = Object.keys(tags.val());
        const tagPath = tagKeys.filter((key) => tags.val()[key].id === tag.id);
        tagPathArray.push(tagPath[0]);
    });

    const organizationKeys = Object.keys(organizations.val());
    const organizationPath = organizationKeys.filter(
        (key) => organizations.val()[key].id === newContent.organization.id
    );

    for (let i = 0; i < tagPathArray.length; i++) {
        const tagPath = tagPathArray[i];
        const tagRef = ref(db, `${dbPaths.allTags}/${tagPath}`);
        try {
            await update(tagRef, newTags[i]);
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }

    try {
        await update(
            ref(db, `${dbPaths.allOrganizations}/${organizationPath}`),
            newOrganization
        );
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export async function createContent(content: Content): Promise<void> {
    try {
        const snapshot = await get(ref(db, dbPaths.validateContent));
        if (snapshot.exists()) {
            const allContent: Content[] = Object.values(snapshot.val());
            if (allContent.length === 0) {
                const newContent = {
                    ...content,
                    id: 1,
                };
                const newContentRef = await push(
                    ref(db, dbPaths.validateContent)
                );
                await updateUsed(content);
                return await update(newContentRef, newContent);
            } else {
                const lastContent = allContent[allContent.length - 1];
                const newContent = {
                    ...content,
                    id: lastContent.id + 1,
                };

                const newContentRef = await push(
                    ref(db, dbPaths.validateContent)
                );
                await updateUsed(content);
                return await update(newContentRef, newContent);
            }
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
export async function deleteContent(index: string) {
    try {
        const snapshot = await get(ref(db, dbPaths.validateContent));
        const allContent: Content[] = snapshot.val();
        let contentKey = "";
        for (const key in allContent) {
            if (allContent[key].id === index) {
                contentKey = key;
                break;
            }
        }
        if (contentKey !== "") {
            const contentRef = ref(
                db,
                `${dbPaths.validateContent}/${contentKey}`
            );
            await remove(contentRef);
        } else {
            console.log(`No content found with id ${index}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function getPendingContent(): Promise<Content[]> {
    try {
        const snapshot: DataSnapshot = await get(ref(db, dbPaths.pendingContent));
        if (snapshot.exists()) {
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

export const postPendingContent = async (content: ContentDB): Promise<void> => {
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

export async function deletePendingContent(title: string): Promise<void> {
    try {
        const contentRef = ref(db, `${dbPaths.pendingContent}/${title}`);
        await remove(contentRef);
    } catch (error) {
        console.error("Error:", error);
    }
};

export async function getMistakes(): Promise<FoundMistakeDB[]> {
    try {
        const snapshot = await get(ref(db, dbPaths.foundMistakes));
        if (snapshot.exists()) {
            return Object.values(snapshot.val());
        } else {
            console.log("No data available");
            return [];
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export async function postMistakes(content: FoundMistake) {
    try {
        const mistakes = await getMistakes();
        if (mistakes.length === 0) {
            const newContent = {
                ...content,
                id: 1,
            };
            const newContentRef = await push(ref(db, dbPaths.foundMistakes));
            return await update(newContentRef, newContent);
        } else {
            const lastMistake = mistakes[mistakes.length - 1];
            const newId = lastMistake.id + 1;
            const newContent = {
                ...content,
                id: newId,
            };
            const newContentRef = await push(ref(db, dbPaths.foundMistakes));
            return await update(newContentRef, newContent);
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export async function deletePendingMistake(index: string): Promise<void> {
    try {
        const snapshot = await get(ref(db, dbPaths.foundMistakes));
        const mistakes: FoundMistakeDB[] = snapshot.val();
        let mistakeKey = "";
        for (const key in mistakes) {
            if (mistakes[key].id === index) {
                mistakeKey = key;
                break;
            }
        }
        if (mistakeKey !== "") {
            const contentRef = ref(
                db,
                `${dbPaths.foundMistakes}/${mistakeKey}`
            );
            await remove(contentRef);
        } else {
            console.log(`No mistake found with id ${index}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};
