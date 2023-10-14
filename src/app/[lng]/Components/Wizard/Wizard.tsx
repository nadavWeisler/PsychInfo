"use client";
import { useState, useEffect, ReactElement } from "react";
import { useRouter } from "next/navigation";
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
import {
    getAllOrganizations,
    getAllTags,
    getContent,
} from "@/app/[lng]/firebase/commands";
import {
    Organization,
    Tag,
    WizardDialogProps,
    Operator,
    Content,
} from "@/app/[lng]/general/interfaces";
import TagsStep from "@/app/[lng]/Components/Wizard/steps/TagsStep";
import OrgsStep from "@/app/[lng]/Components/Wizard/steps/OrgsStep";
import ErrorStep from "@/app/[lng]/Components/Wizard/steps/ErrorStep";
import LangStep from "@/app/[lng]/Components/Wizard/steps/LangStep";
import useTrans from "@/app/[lng]/hooks/useTrans";

export default function WizardDialog({
    open,
    onClose,
}: WizardDialogProps): ReactElement {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [tags, setTags] = useState<Tag[]>([]);
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [selectedOrgs, setSelectedOrgs] = useState<Organization[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

    const { t, i18n } = useTrans();
    const dispatch = useAppDispatch();
    const router = useRouter();

    async function handleSubmit() {
        const results: Content[] = await getContent(
            selectedOrgs,
            selectedTags,
            selectedLanguages,
            Operator.AND
        );
        dispatch(pagesActions.UploadContent({ content: results }));
        onClose();
        router.replace(`${i18n.language}/results`);
    }

    useEffect(() => {
        getAllTags(true, i18n.language).then((res) => setTags(res));
    }, [i18n.language]);

    useEffect(() => {
        getAllOrganizations(true, i18n.language).then((res) =>
            setOrganizations(res)
        );
    }, [i18n.language]);

    function GetStepContent(step: number) {
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
                return <ErrorStep errorMsg={t("wizard.invalid_step")} />;
        }
    }

    const steps: string[] = [
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
                <Button
                    onClick={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep - 1)
                    }
                    disabled={activeStep === 0}
                >
                    {t("common.back")}
                </Button>
                <Button
                    variant={"contained"}
                    onClick={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep + 1)
                    }
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
