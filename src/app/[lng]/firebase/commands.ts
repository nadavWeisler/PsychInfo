import {
    get,
    push,
    ref,
    set,
    remove,
    update,
    DataSnapshot,
} from "@firebase/database";
import { db, dbPath, storage, storagePath } from "./app";
import {
    ref as storageRef,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import {
    Content,
    Operator,
    Organization,
    Tag,
    FoundMistakeDB,
    FoundMistake,
    ContentDB,
} from "@/app/[lng]/general/interfaces";

export async function getAllTags(
    used: boolean,
    langId: string
): Promise<Tag[]> {
    try {
        const snapshot: DataSnapshot = await get(ref(db, dbPath.tags));
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

export async function getAllOrganizations(
    used: boolean,
    langId: string
): Promise<Organization[]> {
    try {
        const snapshot: DataSnapshot = await get(ref(db, dbPath.organizations));
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
    tags: Tag[],
    Languages: string[],
    operator: Operator,
    organizations: Organization[] | null = null
): Promise<Content[]> {
    try {
        const snapshot: DataSnapshot = await get(
            ref(db, dbPath.validateContent)
        );
        if (snapshot.exists()) {
            const content: Content[] = Object.values(snapshot.val());
            const data = Object.values(content).filter((item) => {
                let org = false;
                let tag = false;
                let lang = false;
                if (organizations !== null) {
                    if (organizations.length > 0) {
                        org = organizations.some(
                            (organization) =>
                                item.organization.id === organization.id
                        );
                    } else {
                        org = true;
                    }
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
                if (operator === Operator.AND && organizations !== null) {
                    return org && tag && lang;
                } else if (
                    operator === Operator.AND &&
                    organizations === null
                ) {
                    return tag && lang;
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
        const newTagRef = await push(ref(db, dbPath.tags));
        return await set(newTagRef, tag);
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export async function createOrganization(
    organization: Organization
): Promise<void> {
    try {
        const newOrganizationRef = await push(ref(db, dbPath.organizations));
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

    const tags = await get(ref(db, dbPath.tags));
    const organizations = await get(ref(db, dbPath.organizations));

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
        const tagRef = ref(db, `${dbPath.tags}/${tagPath}`);
        try {
            await update(tagRef, newTags[i]);
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }

    try {
        await update(
            ref(db, `${dbPath.organizations}/${organizationPath}`),
            newOrganization
        );
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export async function createContent(content: Content): Promise<void> {
    try {
        const snapshot = await get(ref(db, dbPath.validateContent));
        if (snapshot.exists()) {
            const allContent: Content[] = Object.values(snapshot.val());
            if (allContent.length === 0) {
                const newContent = {
                    ...content,
                    id: "1",
                };
                const newContentRef = await push(
                    ref(db, dbPath.validateContent)
                );
                await updateUsed(content);
                return await set(newContentRef, newContent);
            } else {
                const lastContent = allContent[allContent.length - 1];
                const newContent = {
                    ...content,
                    id: (lastContent.id + 1).toString(),
                };

                const newContentRef = await push(
                    ref(db, dbPath.validateContent)
                );
                await updateUsed(content);
                return await set(newContentRef, newContent);
            }
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
export async function deleteContent(index: string) {
    try {
        const snapshot = await get(ref(db, dbPath.validateContent));
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
                `${dbPath.validateContent}/${contentKey}`
            );
            await remove(contentRef);
            updateUnusedTags();
        } else {
            console.log(`No content found with id ${index}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

export const updateUnusedTags = async (): Promise<void> => {
    try {
        const snapshot = await get(ref(db, dbPath.validateContent));
        if (snapshot.exists()) {
            const allContent: Content[] = Object.values(snapshot.val());
            const tagSnapshot = await get(ref(db, dbPath.tags));
            const organizationSnapshot = await get(
                ref(db, dbPath.organizations)
            );
            if (tagSnapshot.exists() && organizationSnapshot.exists()) {
                const allTagsValues: Tag[] = Object.values(tagSnapshot.val());
                const allOrganizationsValues: Organization[] = Object.values(
                    organizationSnapshot.val()
                );
                for (const tag of allTagsValues) {
                    const isUsed = allContent.some((content) =>
                        content.tags.some(
                            (contentTag) => contentTag.id === tag.id
                        )
                    );

                    let tagKey = "";
                    for (const [key, value] of Object.entries(
                        tagSnapshot.val() as Record<string, Tag>
                    )) {
                        if (value.id === tag.id) {
                            tagKey = key;
                            break;
                        }
                    }

                    if (!isUsed) {
                        const tagRef = ref(db, `${dbPath.tags}/${tagKey}`);
                        if (tagKey !== "") {
                            await update(tagRef, { ...tag, used: false });
                        }
                    }
                }
                for (const organization of allOrganizationsValues) {
                    const isUsed = allContent.some(
                        (content) => content.organization.id === organization.id
                    );

                    let organizationKey = "";
                    for (const [key, value] of Object.entries(
                        organizationSnapshot.val() as Record<
                            string,
                            Organization
                        >
                    )) {
                        if (value.id === organization.id) {
                            organizationKey = key;
                            break;
                        }
                    }

                    if (!isUsed) {
                        const organizationRef = ref(
                            db,
                            `${dbPath.organizations}/${organizationKey}`
                        );
                        if (organizationKey !== "") {
                            await update(organizationRef, {
                                ...organization,
                                used: false,
                            });
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const getPendingContent = async (): Promise<Content[]> => {
    try {
        const snapshot: DataSnapshot = await get(
            ref(db, dbPath.pendingContent)
        );
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
            ref(db, dbPath.pendingContent + "/" + content.title)
        );
        return await set(newContentRef, content);
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export async function deletePendingContent(title: string): Promise<void> {
    try {
        const contentRef = ref(db, `${dbPath.pendingContent}/${title}`);
        await remove(contentRef);
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function uploadFile(file: File, fileName: string): Promise<void> {
    const fileRef = storageRef(storage, storagePath.files + "/" + fileName);
    const uploadTask = uploadBytesResumable(fileRef, file);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
        },
        (error) => {
            console.error("Error:", error);
        },
        () => {
            console.log("Upload complete");
        }
    );
}

export async function getFiles(contentTitle: string): Promise<string> {
    try {
        const url = await getDownloadURL(
            storageRef(storage, storagePath.files + "/" + contentTitle)
        );
    return url;
    } catch (e) {
        console.log(e);
    }
    return "Download succeed";
}

export async function getMistakes(): Promise<FoundMistakeDB[]> {
    try {
        const snapshot = await get(ref(db, dbPath.foundMistakes));
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
}

export async function postMistakes(content: FoundMistake) {
    try {
        const mistakes = await getMistakes();
        if (mistakes.length === 0) {
            const newContent = {
                ...content,
                id: 1,
            };
            const newContentRef = await push(ref(db, dbPath.foundMistakes));
            return await update(newContentRef, newContent);
        } else {
            const lastMistake = mistakes[mistakes.length - 1];
            const newId = lastMistake.id + 1;
            const newContent = {
                ...content,
                id: newId,
            };
            const newContentRef = await push(ref(db, dbPath.foundMistakes));
            return await update(newContentRef, newContent);
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export async function deletePendingMistake(index: string): Promise<void> {
    try {
        const snapshot = await get(ref(db, dbPath.foundMistakes));
        const mistakes: FoundMistakeDB[] = snapshot.val();
        let mistakeKey = "";
        for (const key in mistakes) {
            if (mistakes[key].id === index) {
                mistakeKey = key;
                break;
            }
        }
        if (mistakeKey !== "") {
            const contentRef = ref(db, `${dbPath.foundMistakes}/${mistakeKey}`);
            await remove(contentRef);
        } else {
            console.log(`No mistake found with id ${index}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function deleteTags(id: string) {
    try {
        const snapshot = await get(ref(db, dbPath.tags));
        const tags: [string, Tag][] = Object.entries(snapshot.val());

        let tagKey = "";
        for (const [key, value] of tags) {
            if (value.id === id) {
                tagKey = key;
                break;
            }
        }
        if (tagKey !== "") {
            const contentRef = ref(db, `${dbPath.tags}/${tagKey}`);
            await remove(contentRef);
        } else {
            console.log(`No tags found with id ${id}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function deleteOrganization(id: string) {
    try {
        const snapshot = await get(ref(db, dbPath.organizations));
        const organizations: [string, Organization][] = Object.entries(
            snapshot.val()
        );

        let organizationKey = "";
        for (const [key, value] of organizations) {
            if (value.id === id) {
                organizationKey = key;
                break;
            }
        }
        if (organizationKey !== "") {
            const contentRef = ref(
                db,
                `${dbPath.organizations}/${organizationKey}`
            );
            await remove(contentRef);
        } else {
            console.log(`No organizations found with id ${id}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function updateContent(content: Content): Promise<void> {
    try {
        const snapshot = await get(ref(db, `${dbPath.validateContent}`));
        if (snapshot.exists()) {
            const allContent: [string, Content][] = Object.entries(
                snapshot.val()
            );
            let contentKey = "";
            for (const [key, value] of allContent) {
                if (value.id === content.id) {
                    contentKey = key;
                    break;
                }
            }
            if (contentKey !== "") {
                await update(
                    ref(db, `${dbPath.validateContent}/${contentKey}`),
                    content
                );
            } else {
                console.log(`No content found with id ${content.id}`);
            }
        } else {
            console.log(`No content found`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
