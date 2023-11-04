import { Content, Tag, Organization } from "@/app/[lng]/general/interfaces";
import { faker } from "@faker-js/faker";

export function createRandomTagsOrOrg(
    dataType: "tags" | "orgs"
): Tag[] | Organization {
    const data: Tag[] | Organization[] = [];
    for (let i = 0; i < 3; i++) {
        data.push({
            id: faker.string.uuid(),
            display: faker.lorem.word(),
            languageId: faker.helpers.arrayElement(["he", "en", "arb", "rus"]),
            used: faker.datatype.boolean(),
        });
    }
    if (dataType === "tags") {
        return data as Tag[];
    }
    return data[0] as Organization;
}

export function createRandomContent(): Content {
    const title = faker.lorem.text();
    const link = faker.internet.url();
    const tags = createRandomTagsOrOrg("tags") as Tag[];
    const organization = createRandomTagsOrOrg("orgs") as Organization;
    const description = faker.lorem.paragraph();
    const languageId = faker.helpers.arrayElement(["he", "en", "arb", "rus"]);
    const uploader = faker.person.firstName();
    const id = faker.string.uuid();

    return {
        title,
        link,
        tags,
        organization,
        description,
        languageId,
        uploader,
        id,
    };
}
