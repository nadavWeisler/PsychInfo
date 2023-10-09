"use client";
import { Fragment } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ResultAccordionProps } from "@/app/General/interfaces";

function ResultAccordion({ title = "", content = "", link = "",  }: ResultAccordionProps) {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{content}</Typography>
            </AccordionDetails>
        </Accordion>
    );
}

export default ResultAccordion;
