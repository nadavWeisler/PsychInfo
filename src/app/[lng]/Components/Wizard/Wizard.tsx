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
import { getAllTags, getContent } from "@/app/[lng]/firebase/commands";
import {
    Tag,
    WizardDialogProps,
    Operator,
    Content,
} from "@/app/[lng]/general/interfaces";
import TagsStep from "@/app/[lng]/Components/Wizard/steps/TagsStep";
import ErrorStep from "@/app/[lng]/Components/Wizard/steps/ErrorStep";
import LangStep from "@/app/[lng]/Components/Wizard/steps/LangStep";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";

export default function WizardDialog({
    open,
    onClose,
}: WizardDialogProps): ReactElement {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [isError, setError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const { t, i18n, direction } = useTrans();
    const dispatch = useAppDispatch();
    const router = useRouter();

    async function handleSubmit() {
        const isLangsError = selectedLanguages.length === 0;
        setError(isLangsError);
        if (isLangsError) {
            setErrorMsg(errorMsgArray[activeStep]);
            return;
        }
        const results: Content[] = await getContent(
            selectedTags,
            selectedLanguages,
            Operator.AND
        );
        dispatch(pagesActions.UploadContent({ content: results }));
        onClose();
        router.replace(`/${i18n.language}/results`);
    }

    useEffect(() => {
        getAllTags(true, i18n.language).then((res) => setTags(res));
    }, [i18n.language]);

    const errorMsgArray = [
        t(LocalizationKeys.Wizard.NoTags),
        t(LocalizationKeys.Wizard.NoOrgs),
        t(LocalizationKeys.Wizard.NoLangs),
    ];
    const handleNext = () => {
        switch (activeStep) {
            case 0:
                const isTagsError = selectedTags.length === 0;
                setError(isTagsError);
                if (isTagsError) {
                    setErrorMsg(errorMsgArray[activeStep]);
                    return;
                }
                break;
            default:
                setError(true);
                setErrorMsg(t(LocalizationKeys.Wizard.InvalidStep));
                return;
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    function GetStepContent(step: number) {
        switch (step) {
            case 0:
                return (
                    <TagsStep
                        tags={tags}
                        updateSelectedTags={setSelectedTags}
                        isError={isError}
                        errorMsg={errorMsg}
                    />
                );
            case 1:
                return (
                    <LangStep
                        updateSelectedLangs={setSelectedLanguages}
                        isError={isError}
                        errorMsg={errorMsg}
                    />
                );
            default:
                return <ErrorStep errorMsg={t(LocalizationKeys.Wizard.InvalidStep)} />;
        }
    }

    const steps: string[] = [
        t(LocalizationKeys.Common.Tags),
        t(LocalizationKeys.Common.Organizations),
        t(LocalizationKeys.Common.Languages),
    ];

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle dir={direction}>
                {t(LocalizationKeys.Wizard.WhichInfoYouNeed)}
            </DialogTitle>
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
            <DialogActions dir={direction}>
                <Button onClick={onClose}>{t(LocalizationKeys.Common.Close)}</Button>
                <Button
                    onClick={() =>
                        setActiveStep((prevActiveStep) => prevActiveStep - 1)
                    }
                    disabled={activeStep === 0}
                >
                    {t(LocalizationKeys.Common.Back)}
                </Button>
                <Button
                    variant={"contained"}
                    onClick={handleNext}
                    disabled={activeStep === 1}
                >
                    {t(LocalizationKeys.Common.Next)}
                </Button>
                {activeStep === 1 ? (
                    <Button
                        variant={"contained"}
                        color={"primary"}
                        onClick={handleSubmit}
                    >
                        {t(LocalizationKeys.Common.Submit)}
                    </Button>
                ) : null}
            </DialogActions>
        </Dialog>
    );
}
