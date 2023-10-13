import { useState, useEffect, Fragment } from "react";
import { Chip, Grid, Typography } from "@mui/material";
import { Organization } from "@/app/[lng]/general/interfaces";
import { GetAllDisplays, ListContainsById } from "@/app/[lng]/general/utils";
import { useTranslation } from "react-i18next";

interface OrganizationStepProps {
    organizations: Organization[];
    updateSelectedOrganizations: (organizations: Organization[]) => void;
}

export default function OrgsStep({
    organizations,
    updateSelectedOrganizations,
}: OrganizationStepProps) {
    const { t } = useTranslation();
    const [selectedOrgs, setSelectedOrgs] = useState<Organization[]>([]);
    const [displayOrgs, setDisplayOrgs] = useState<string[]>([]);

    const handleChoice = (org: Organization) => {
        if (ListContainsById(selectedOrgs, org.id)) {
            const index = selectedOrgs.indexOf(org);
            selectedOrgs.splice(index, 1);
            setSelectedOrgs([...selectedOrgs]);
            setDisplayOrgs(GetAllDisplays(selectedOrgs));
        } else {
            setSelectedOrgs([...selectedOrgs, org]);
            setDisplayOrgs([...displayOrgs, org.display]);
        }
    };

    useEffect(() => {
        updateSelectedOrganizations(selectedOrgs);
    }, [selectedOrgs]);

    return (
        <Fragment>
            <Typography
                sx={{ marginBottom: "20px", marginTop: "20px" }}
                variant="h4"
            >
                {t("wizard.choose_organizations")}
            </Typography>
            <Grid container spacing={2}>
                {organizations.map((organization) => (
                    <Grid item key={organization.id}>
                        <Chip
                            key={organization.id}
                            label={organization.display}
                            onClick={() => handleChoice(organization)}
                            variant={
                                ListContainsById(selectedOrgs, organization.id)
                                    ? "filled"
                                    : "outlined"
                            }
                            color="primary"
                        />
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    );
}
