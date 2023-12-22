import { ChangeEvent } from "react"
import {Radio, RadioGroup, FormControlLabel,  FormLabel, FormControl, Typography } from "@mui/material"
import { Question } from "./OrgWizard"

interface RadioStepProps {
    question: Question;
    setValue: (e: ChangeEvent<HTMLInputElement>) => void;
    isHomless?: (value: boolean) => void;
}

export default function RadioStep({question, setValue}: RadioStepProps ) {
    return (
    <>
        <Typography variant="h6">
            {question?.text}
        </Typography>
        <FormControl>
        <RadioGroup
            onChange={setValue}
            defaultValue={question?.options[0]}
        >
            {question?.options.map((option, index) => (
                <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
                />
            ))}
        </RadioGroup>
        </FormControl>
    </>
    )
}