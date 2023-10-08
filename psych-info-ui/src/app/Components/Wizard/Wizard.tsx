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

    const handleReset = () => {
        setActiveStep(0);
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
                    {activeStep === steps.length ? (
                        <Fragment>
                            <Typography>All steps completed</Typography>
                            <Button onClick={handleReset}>Reset</Button>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Typography>{steps[activeStep]}</Typography>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                            >
                                {activeStep === steps.length - 1
                                    ? "Finish"
                                    : "Next"}
                            </Button>
                        </Fragment>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}

export default WizardDialog;
