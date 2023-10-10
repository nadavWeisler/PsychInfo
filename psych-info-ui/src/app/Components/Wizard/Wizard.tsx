"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { pagesActions } from "@/app/store/pagesSlice";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stepper,
    Step,
    StepLabel,
    ThemeProvider,
} from "@mui/material";
import { darkTheme } from "@/app/General/styles";
import Step1 from "@/app/Components/Wizard/Step1";
import ErrorStep from "@/app/Components/Wizard/ErrorStep";
import { WizardDialogProps } from "@/app/general/interfaces";
import { getTags, getOrganizations } from "@/app/General/utils";

function WizardDialog({
    open = false,
    onClose = () => null,
}: WizardDialogProps) {
    const [activeStep, setActiveStep] = useState(0);
    const [tags, setTags] = useState<string[]>([]);
    const [organizations, setOrganizations] = useState<string[]>([]);
    const [tagsArr, setTagsArr] = useState<string[]>([]);
    const [organizationArr, setOrganizationArr] = useState<string[]>([]);

    const dispatch = useDispatch();

    const tagsArrHandler = (data: string[]) => {
        setTagsArr(data);
    };

    const organizationArrHandler = (data: string[]) => {
        setOrganizationArr(data);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const router = useRouter();

    const handleSubmit = () => {
        const data = {
            tags: tagsArr,
            organization: organizationArr,
        };
        dispatch(pagesActions.addData(data));
        onClose();
        router.push("/results");
    };

    useEffect(() => {
        setTags(getTags());
        setOrganizations(getOrganizations());
    }, []);

    const GetStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Step1
                        data={tags}
                        text={"תגיות"}
                        addData={tagsArrHandler}
                        dataType="tags"
                    />
                );
            case 1:
                return (
                    <Step1
                        data={organizations}
                        text={"ארגונים"}
                        addData={organizationArrHandler}
                        dataType="organization"
                    />
                );
            default:
                return <ErrorStep errorMsg={"Invalid Step"} />;
        }
    };

    const steps = ["תגיות", "ארגונים"];

    return (
        <ThemeProvider theme={darkTheme}>
            <Dialog open={open} onClose={onClose} fullWidth>
                <DialogTitle>מה המידע שאתה צריך?</DialogTitle>
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
                    <Button onClick={onClose}>{"סגור"}</Button>
                    <Button onClick={handleBack} disabled={activeStep === 0}>
                        {"אחורה"}
                    </Button>
                    <Button
                        variant={"contained"}
                        onClick={handleNext}
                        disabled={activeStep === 1}
                    >
                        {"הבא"}
                    </Button>
                    {activeStep === 1 && (
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            onClick={handleSubmit}
                        >
                            {"הגש"}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}

export default WizardDialog;
