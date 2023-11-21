import { getAllOrganizations, getAllTags, updateTag } from "@/app/[lng]/firebase/commands";
import { Organization, Tag } from "@/app/[lng]/general/interfaces";

export async function main() {
    const tags: Tag[] = await getAllTags(false);
    for(var tag of tags) {
        // tag.heDisplay = tag.display;
        tag.arbDisplay = "";
        tag.enDisplay = "";
        tag.rusDisplay = "";
        await updateTag(tag);
    }
    const orgs: Organization[] = await getAllOrganizations(false);
    for(var org of orgs) {
        // org.heDisplay = org.display;
        org.arbDisplay = "";
        org.enDisplay = "";
        org.rusDisplay = "";
        await updateTag(org);
    }
}