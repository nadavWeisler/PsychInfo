import React, { useState, ChangeEvent, useEffect } from "react";
import {
    Button,
    Dialog,
    SelectChangeEvent,
    DialogContent,
    Stepper,
    Step,
    StepLabel,
    DialogActions,
} from "@mui/material";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { addresses, questions } from "@/app/[lng]/general/resources";
import { OrgWizardProps, Question } from "@/app/[lng]/general/interfaces";
import RadioStep from "@/app/[lng]/Components/RadioStep";
import SelectStep from "@/app/[lng]/Components/SelectStep";

function OrgWizard({ open, onClose }: OrgWizardProps) {
    const [activeFollowUp, setActiveFollowUp] = useState(0);
    const [activeStep, setActiveStep] = useState<number>(0);
    const [currentAddress, setCurrentAddress] = useState(addresses[0]);
    const [originAddress, setOriginAddress] = useState(addresses[0]);
    const [data, setData] = useState<Question[]>([]);
    const [isHomless, setIsHomless] = useState(false);
    const [q1, setQ1] = useState<string>("");
    const [q2, setQ2] = useState<string>("");
    const [q3, setQ3] = useState<string>("");
    const [q4, setQ4] = useState<string>("");
    const [q5, setQ5] = useState<string>("");
    const [q6, setQ6] = useState<string>("");
    const [q7, setQ7] = useState<string>("");
    const [q8, setQ8] = useState<string>("");
    const [q9, setQ9] = useState<string>("");
    const [q10, setQ10] = useState<string>("");
    const [q11, setQ11] = useState<string>("");

    const { t } = useTrans();

    useEffect(() => {
        if (q2 === "כן") {
            setIsHomless(true);
        } else if (q2 === "לא") {
            setIsHomless(false);
        }
    }, [q2]);

    const handleNext = () => {
        if (activeStep === 2) {
            setActiveFollowUp((prevActiveFollowUp) => prevActiveFollowUp + 1);
        }
        if (
            activeStep !== 2 ||
            (isHomless && activeFollowUp >= 2) ||
            (!isHomless && activeFollowUp >= 0)
        ) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            if (activeStep === 4) {
                setActiveFollowUp(0);
            }
        }
    };

    const handleCurrentAddress = (event: SelectChangeEvent) => {
        setCurrentAddress(event.target.value);
    };
    const handleOriginAddress = (event: SelectChangeEvent) => {
        setOriginAddress(event.target.value);
    };

    const handleQ1 = (event: ChangeEvent<HTMLInputElement>) => {
        setQ1(event.target.value);
    };
    const handleQ2 = (event: ChangeEvent<HTMLInputElement>) => {
        setQ2(event.target.value);
    };
    const handleQ3 = (event: ChangeEvent<HTMLInputElement>) => {
        setQ3(event.target.value);
    };
    const handleQ4 = (event: ChangeEvent<HTMLInputElement>) => {
        setQ4(event.target.value);
    };
    const handleQ5 = (event: ChangeEvent<HTMLInputElement>) => {
        setQ5(event.target.value);
    };
    const handleQ6 = (event: ChangeEvent<HTMLInputElement>) => {
        setQ6(event.target.value);
    };
    const handleQ7 = (event: ChangeEvent<HTMLInputElement>) => {
        setQ7(event.target.value);
    };
    const handleQ8 = (event: ChangeEvent<HTMLInputElement>) => {
        setQ8(event.target.value);
    };
    const handleQ9 = (event: ChangeEvent<HTMLInputElement>) => {
        setQ9(event.target.value);
    };
    const handleQ10 = (event: ChangeEvent<HTMLInputElement>) => {
        setQ10(event.target.value);
    };
    const handleQ11 = (event: ChangeEvent<HTMLInputElement>) => {
        setQ11(event.target.value);
    };

    const handleHomless = (value: boolean) => {
        setIsHomless(value);
    };

    const handleSubmit = () => {};

    function GetStepContent(step: number) {
        switch (step) {
            case 0:
                return (
                    <RadioStep setValue={handleQ1} question={questions[step]} />
                );
            case 1:
                return (
                    <RadioStep setValue={handleQ2} question={questions[step]} />
                );
            case 2:
                if (isHomless) {
                    switch (activeFollowUp) {
                        case 0:
                            return (
                                <RadioStep
                                    setValue={handleQ11}
                                    question={questions[2]}
                                />
                            );
                        case 1:
                            return (
                                <SelectStep
                                    currentOrOrigin={"current"}
                                    address={currentAddress}
                                    handleAddress={handleCurrentAddress}
                                />
                            );
                        case 2:
                            return (
                                <SelectStep
                                    currentOrOrigin={"origin"}
                                    address={originAddress}
                                    handleAddress={handleOriginAddress}
                                />
                            );
                        default:
                            return;
                    }
                } else {
                    return (
                        <SelectStep
                            currentOrOrigin={"current"}
                            address={currentAddress}
                            handleAddress={handleCurrentAddress}
                        />
                    );
                }
            case 3:
                return (
                    <RadioStep
                        setValue={handleQ3}
                        question={questions[step]}
                        isHomless={handleHomless}
                    />
                );
            case 4:
                return (
                    <RadioStep setValue={handleQ4} question={questions[step]} />
                );
            case 5:
                return (
                    <RadioStep setValue={handleQ5} question={questions[step]} />
                );
            case 6:
                return (
                    <RadioStep setValue={handleQ6} question={questions[step]} />
                );
            case 7:
                return (
                    <RadioStep setValue={handleQ7} question={questions[step]} />
                );
            case 8:
                return (
                    <RadioStep setValue={handleQ8} question={questions[step]} />
                );
            case 9:
                return (
                    <RadioStep setValue={handleQ9} question={questions[step]} />
                );
            case 10:
                return (
                    <RadioStep
                        setValue={handleQ10}
                        question={questions[step]}
                    />
                );
            default:
                return;
        }
    }

    const steps: string[] = [
        "שאלה 1",
        "שאלה 2",
        "שאלה 3",
        "שאלה 4",
        "שאלה 5",
        "שאלה 6",
        "שאלה 7",
        "שאלה 8",
        "שאלה 9",
    ];

    return (
        <>
            <Dialog open={open} onClose={onClose} fullScreen>
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
                    <Button onClick={onClose}>
                        {t(LocalizationKeys.Common.Close)}
                    </Button>
                    <Button
                        onClick={() =>
                            setActiveStep(
                                (prevActiveStep) => prevActiveStep - 1
                            )
                        }
                        disabled={activeStep === 0}
                    >
                        {t(LocalizationKeys.Common.Back)}
                    </Button>
                    <Button
                        variant={"contained"}
                        onClick={handleNext}
                        disabled={activeStep === 8}
                    >
                        {t(LocalizationKeys.Common.Next)}
                    </Button>
                    {activeStep === 8 ? (
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
        </>
    );
}

export default OrgWizard;
