"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { pagesActions } from "@/store/pagesSlice";
import { useAppDispatch } from "@/app/[lng]/hooks/redux";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stepper,
    StepLabel,
    Step,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { getAllOrganizations, getAllTags } from "@/app/[lng]/firebase/commands";
import { Organization, Tag, WizardDialogProps } from "@/app/[lng]/general/interfaces";
import TagsStep from "@/app/[lng]/Components/Wizard/steps/TagsStep";
import OrgsStep from "@/app/[lng]/Components/Wizard/steps/OrgsStep";
import ErrorStep from "@/app/[lng]/Components/Wizard/steps/ErrorStep";
import LangStep from "@/app/[lng]/Components/Wizard/steps/LangStep";

function WizardDialog({ open, onClose }: WizardDialogProps) {
    const { t, i18n } = useTranslation();
    const [activeStep, setActiveStep] = useState(0);
    const [tags, setTags] = useState<Tag[]>([]);
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [selectedOrgs, setSelectedOrgs] = useState<Organization[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

    const dispatch = useAppDispatch();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const router = useRouter();

    const handleSubmit = () => {
        const data = {
            tags: selectedTags,
            organization: selectedOrgs,
            languages: selectedLanguages,
        };
        dispatch(pagesActions.addData(data));
        onClose();
        router.replace("/results");
    };

    useEffect(() => {
        getAllTags(true, i18n.language).then((res) => setTags(res));
    }, []);

    useEffect(() => {
        getAllOrganizations(true, i18n.language).then((res) =>
            setOrganizations(res)
        );
    }, []);

    const GetStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <TagsStep
                        tags={tags}
                        updateSelectedTags={setSelectedTags}
                    />
                );
            case 1:
                return (
                    <OrgsStep
                        organizations={organizations}
                        updateSelectedOrganizations={setSelectedOrgs}
                    />
                );
            case 2:
                return <LangStep updateSelectedLangs={setSelectedLanguages} />;
            default:
                return <ErrorStep errorMsg={"Invalid Step"} />;
        }
    };

    const steps = [
        t("common.tags"),
        t("common.organizations"),
        t("common.languages"),
    ];

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{t("wizard.which_info_you_need")}</DialogTitle>
            <DialogContent>
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {GetStepContent(activeStep)}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{t("common.close")}</Button>
                <Button onClick={handleBack} disabled={activeStep === 0}>
                    {t("common.back")}
                </Button>
                <Button
                    variant={"contained"}
                    onClick={handleNext}
                    disabled={activeStep === 2}
                >
                    {t("common.next")}
                </Button>
                {activeStep === 2 && (
                    <Button
                        variant={"contained"}
                        color={"primary"}
                        onClick={handleSubmit}
                    >
                        {t("common.submit")}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

export default WizardDialog;
