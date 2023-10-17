import { useState, useEffect, ReactElement } from "react";
import { Box, Button, Chip, Grid, Typography, Alert } from "@mui/material";
import {
    Organization,
    OrganizationStepProps,
} from "@/app/[lng]/general/interfaces";
import { GetAllDisplays, ListContainsById } from "@/app/[lng]/general/utils";
import useTrans from "@/app/[lng]/hooks/useTrans";

export default function OrgsStep({
    organizations,
    updateSelectedOrganizations,
    isError,
    errorMsg,
}: OrganizationStepProps): ReactElement {
    const [selectedOrgs, setSelectedOrgs] = useState<Organization[]>([]);
    const [displayOrgs, setDisplayOrgs] = useState<string[]>([]);

    const { t, direction } = useTrans();

    useEffect(() => {
        updateSelectedOrganizations(selectedOrgs);
    }, [selectedOrgs]);

    function handleChoice(org: Organization) {
        if (ListContainsById(selectedOrgs, org.id)) {
            const index = selectedOrgs.indexOf(org);
            selectedOrgs.splice(index, 1);
            setSelectedOrgs([...selectedOrgs]);
            setDisplayOrgs(GetAllDisplays(selectedOrgs));
        } else {
            setSelectedOrgs([...selectedOrgs, org]);
            setDisplayOrgs([...displayOrgs, org.display]);
        }
    }

    function selectAll() {
        setSelectedOrgs(organizations);
        setDisplayOrgs(GetAllDisplays(organizations));
    }

    function clearSelection() {
        setSelectedOrgs([]);
        setDisplayOrgs([]);
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {isError ? <Alert severity="error">{errorMsg}</Alert> : null}
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography
                    dir={direction}
                    sx={{ marginBottom: "20px", marginTop: "20px" }}
                    variant="h4"
                >
                    {t("wizard.choose_organizations")}
                </Typography>
                <Button
                    dir={direction}
                    sx={{ margin: "20px" }}
                    variant="contained"
                    onClick={selectAll}
                >
                    {t("wizard.choose_all")}
                </Button>
                <Button
                    dir={direction}
                    sx={{ margin: "20px" }}
                    variant="contained"
                    onClick={clearSelection}
                >
                    {t("wizard.clear")}
                </Button>
            </Box>
            <Grid dir={direction} container spacing={2}>
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
        </Box>
    );
}
