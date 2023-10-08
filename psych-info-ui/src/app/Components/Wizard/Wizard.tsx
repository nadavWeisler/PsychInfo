"use client";
import { useState, useEffect } from "react";
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
import Step2 from "@/app/Components/Wizard/Step2";
import Step3 from "@/app/Components/Wizard/Step3";
import ErrorStep from "@/app/Components/Wizard/ErrorStep";
import { WizardDialogProps } from "@/app/General/interfaces";
import { getTags, getOrganizations } from "@/app/General/utils";

function WizardDialog({
    open = false,
    onClose = () => null,
}: WizardDialogProps) {
    const [activeStep, setActiveStep] = useState(0);
    const [tags, setTags] = useState<string[]>([]);
    const [organizations, setOrganizations] = useState<string[]>([]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = () => {
        onClose();
        // TODO: add more code
    };

    useEffect(() => {
        setTags(getTags());
        setOrganizations(getOrganizations());
    }, []);

    const GetStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <Step1 data={tags} text={"תגיות"} />;
            case 1:
                return <Step1 data={organizations} text={"ארגונים"} />;
            case 2:
                return <Step2 />;
            case 3:
                return <Step3 />;
            default:
                return <ErrorStep errorMsg={"Invalid Step"} />;
        }
    };

    const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];

    return (
        <ThemeProvider theme={darkTheme}>
            <Dialog open={open} onClose={onClose} fullWidth>
                <DialogTitle>Wizard Dialog</DialogTitle>
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
                    <Button onClick={onClose}>{"Close"}</Button>
                    <Button onClick={handleBack} disabled={activeStep === 0}>
                        {"Back"}
                    </Button>
                    <Button
                        variant={"contained"}
                        onClick={handleNext}
                        disabled={activeStep === 3}
                    >
                        {"Next"}
                    </Button>
                    {activeStep === 3 && (
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            onClick={handleSubmit}
                        >
                            {"Submit"}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}

export default WizardDialog;
