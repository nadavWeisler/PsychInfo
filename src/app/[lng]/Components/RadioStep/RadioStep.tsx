import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Typography,
} from "@mui/material";
import { RadioStepProps } from "@/app/[lng]/general/interfaces";

export default function RadioStep({ question, setValue }: RadioStepProps) {
    return (
        <>
            <Typography variant="h6">{question?.text}</Typography>
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
    );
}
