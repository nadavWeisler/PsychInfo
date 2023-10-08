"use client";
import { useState, Fragment } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stepper,
    Step,
    StepLabel,
    Typography,
    ThemeProvider,
} from "@mui/material";
import { darkTheme } from "@/app/General/styles";
import Step1 from "@/app/Components/Wizard/Step1";
import Step2 from "@/app/Components/Wizard/Step2";
import Step3 from "@/app/Components/Wizard/Step3";
import ErrorStep from "@/app/Components/Wizard/ErrorStep";

interface WizardDialogProps {
    open: boolean;
    onClose: () => void;
}

function WizardDialog({
    open = false,
    onClose = () => null,
}: WizardDialogProps) {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = () => {
        onClose();
    };

    const GetStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <Step1 />;
            case 1:
                return <Step2 />;
            case 2:
                return <Step3 />;
            default:
                return <ErrorStep errorMsg={"Invalid Step"} />;
        }
    };

    const steps = ["Step 1", "Step 2", "Step 3"];

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
                        disabled={activeStep === 2}
                    >
                        {"Next"}
                    </Button>
                    {activeStep === 2 && (
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
