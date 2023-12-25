import { useState, useEffect } from "react";
import {
    FormControl,
    FormLabel,
    SelectChangeEvent,
    Select,
    MenuItem,
} from "@mui/material";
import {
    Organization,
    UploadOrganizationProps,
} from "@/app/[lng]/general/interfaces";
import { appTheme } from "@/app/[lng]/general/styles";
import { EMPTY_ORGANIZATION, getSelectStyles } from "@/app/[lng]/general/utils";
import { getAllOrganizations } from "@/app/[lng]/firebase/commands";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { styles } from "@/app/[lng]/Components/UploadOrganization/UploadOrganization.style";

export default function UploadOrganization({
    selectedOrganization,
    selectedOrganizationHandler,
}: UploadOrganizationProps) {
    const [organizations, setOrganizations] = useState<Organization[]>([]);

    const { t, i18n } = useTrans();

    useEffect(() => {
        getAllOrganizations(false, i18n.language).then(
            (allOrgs: Organization[]) => {
                setOrganizations(allOrgs);
            }
        );
    }, []);

    function hangleChangeOrganization(
        event: SelectChangeEvent<typeof selectedOrganization>
    ): void {
        const {
            target: { value },
        } = event;
        const newOrg = organizations.find((org) => org.id === value);
        if (newOrg) {
            selectedOrganizationHandler(newOrg);
        }
    }

    return (
        <FormControl
            key={LocalizationKeys.Common.Organization}
            margin="normal"
            fullWidth
        >
            <FormLabel>{t(LocalizationKeys.Common.Organization)}</FormLabel>
            <Select
                sx={styles.select}
                color={"secondary"}
                value={
                    selectedOrganization === EMPTY_ORGANIZATION
                        ? null
                        : selectedOrganization
                }
                onChange={hangleChangeOrganization}
                renderValue={(selected) => (selected as Organization).display}
            >
                {organizations.map((org) => (
                    <MenuItem
                        key={org.id}
                        value={org.id}
                        style={getSelectStyles(
                            org.id,
                            selectedOrganization
                                ? [selectedOrganization.id]
                                : [],
                            appTheme
                        )}
                    >
                        {org.display}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
