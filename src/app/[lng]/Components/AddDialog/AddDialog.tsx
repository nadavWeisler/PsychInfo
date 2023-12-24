import { useState } from "react";
import { EMPTY_ORGANIZATION, EMPTY_TAG } from "@/app/[lng]/general/utils";
import AddString from "@/app/[lng]/Components/AddString";
import { createOrganization, createTag } from "@/app/[lng]/firebase/commands";
import {
    Tag,
    Organization,
    StringObject,
} from "@/app/[lng]/general/interfaces";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { AddDialogProps } from "@/app/[lng]/general/interfaces";

export default function AddDialog({
    dataType,
    openAddTagDialog,
    openAddOrgDialog,
    setOpenAddTagDialog,
    setOpenAddOrgDialog,
}: AddDialogProps) {
    const [otherOrgValue, setOtherOrgValue] =
        useState<Organization>(EMPTY_ORGANIZATION);
    const [otherTagValue, setOtherTagValue] = useState<Tag>(EMPTY_TAG);

    const { t } = useTrans();

    async function handleCreateTag(): Promise<void> {
        if (otherTagValue) {
            await createTag(otherTagValue).then(() => {
                setOtherTagValue(EMPTY_TAG);
                setOpenAddTagDialog(false);
            });
        }
    }

    async function handleCreateOrg(): Promise<void> {
        if (otherOrgValue) {
            await createOrganization(otherOrgValue).then(() => {
                setOtherOrgValue(EMPTY_ORGANIZATION);
                setOpenAddOrgDialog(false);
            });
        }
    }
    return (
        <>
            {dataType === "tags" ? (
                <AddString
                    onClose={() => setOpenAddTagDialog(false)}
                    handleCreate={handleCreateTag}
                    inputValue={otherTagValue}
                    setInputValue={(tag: StringObject) =>
                        setOtherTagValue({ ...tag, used: false })
                    }
                    open={openAddTagDialog}
                    title={t(LocalizationKeys.Upload.CreateNewTag)}
                />
            ) : (
                <AddString
                    onClose={() => setOpenAddOrgDialog(false)}
                    handleCreate={handleCreateOrg}
                    inputValue={otherOrgValue}
                    setInputValue={(org: StringObject) =>
                        setOtherOrgValue({ ...org, used: false })
                    }
                    open={openAddOrgDialog}
                    title={t(LocalizationKeys.Upload.CreateNewOrganization)}
                />
            )}
        </>
    );
}
