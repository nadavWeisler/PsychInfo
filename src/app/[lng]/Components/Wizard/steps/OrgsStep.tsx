import { useState, useEffect, ReactElement } from "react";
import { Box, Button, Chip, Grid, Typography, Alert } from "@mui/material";
import { Organization, OrganizationStepProps } from "@/app/[lng]/general/interfaces";
import { GetAllDisplays, ListContainsById, getStringObjectDisplay } from "@/app/[lng]/general/utils";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { styles } from "@/app/[lng]/Components/Wizard/steps/OrgsStep.style";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

export default function OrgsStep({
    organizations,
    updateSelectedOrganizations,
    isError,
    errorMsg,
}: OrganizationStepProps): ReactElement {
    const [selectedOrgs, setSelectedOrgs] = useState<Organization[]>([]);
    const [displayOrgs, setDisplayOrgs] = useState<string[]>([]);

    const { t, direction, i18n } = useTrans();

    useEffect(() => {
        updateSelectedOrganizations(selectedOrgs);
    }, [selectedOrgs]);

    function handleChoice(org: Organization) {
        if (ListContainsById(selectedOrgs, org.id)) {
            const index = selectedOrgs.indexOf(org);
            selectedOrgs.splice(index, 1);
            setSelectedOrgs([...selectedOrgs]);
            setDisplayOrgs(GetAllDisplays(selectedOrgs, i18n.language));
        } else {
            setSelectedOrgs([...selectedOrgs, org]);
            setDisplayOrgs([...displayOrgs, getStringObjectDisplay(org, i18n.language)]);
        }
    }

    function selectAll() {
        setSelectedOrgs(organizations);
        setDisplayOrgs(GetAllDisplays(organizations, i18n.language));
    }

    function clearSelection() {
        setSelectedOrgs([]);
        setDisplayOrgs([]);
    }

    return (
        <Box sx={styles.root}>
            {isError ? <Alert severity="error">{errorMsg}</Alert> : null}
            <Box sx={styles.secondary}>
                <Typography dir={direction} sx={styles.typ} variant="h4">
                    {t(LocalizationKeys.Wizard.ChooseOrganizations)}
                </Typography>
                <Button
                    dir={direction}
                    sx={styles.button}
                    variant="contained"
                    onClick={selectAll}
                >
                    {t(LocalizationKeys.Wizard.ChooseAll)}
                </Button>
                <Button
                    dir={direction}
                    sx={styles.button}
                    variant="contained"
                    onClick={clearSelection}
                >
                    {t(LocalizationKeys.Wizard.Clear)}
                </Button>
            </Box>
            <Grid dir={direction} container spacing={2}>
                {organizations.map((organization) => (
                    <Grid item key={organization.id}>
                        <Chip
                            key={organization.id}
                            label={getStringObjectDisplay(organization, i18n.language)}
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
        </Box>
    );
}
