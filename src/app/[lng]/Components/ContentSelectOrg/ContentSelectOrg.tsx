import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import useTrans from "@/app/[lng]/hooks/useTrans";
import {
    Organization,
    ContentSelectOrgProps,
} from "@/app/[lng]/general/interfaces";

export default function ContentSelectOrg({
    organizations,
    prevContent,
    selectedOrganization,
    handleChangeOrganization,
    getSelectStyles,
    appTheme,
}: ContentSelectOrgProps) {
    const { t } = useTrans();
    return (
        <FormControl margin="normal" fullWidth required>
            <InputLabel>{t(LocalizationKeys.Common.Organization)}</InputLabel>
            <Select
                defaultValue={prevContent.organization}
                value={selectedOrganization}
                onChange={handleChangeOrganization}
                renderValue={(selected) =>
                    (selected as Organization).display
                }
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
