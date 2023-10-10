"use client";
import { Fragment, useState } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    Link,
    Button,
    Box,
    ThemeProvider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Content, Language } from "@/app/general/interfaces";
import AccordionContent from "@/app/Components/ResultComp/AccordionContent";
import ShareDialog from "@/app/Components/ResultComp/ShareDialog";
import { darkTheme } from "@/app/General/styles";

function ResultAccordion({
    title = "",
    link = "",
    tags = [],
    organization = { id: "", display: "", used: false },
    description = "",
    language = Language.Hebrew,
    uploader = "",
}: Content) {
    const [open, setOpen] = useState(false);

    const openShareDialog = () => {
        setOpen(true);
    };

    const closeShareDialog = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Box
                sx={{
                    width: "60%",
                    margin: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <AccordionContent
                            title={title}
                            link={link}
                            tags={tags}
                            organization={organization}
                            description={description}
                            language={language}
                            uploader={uploader}
                        />
                        <Link href={link} target="_blank" rel="noopener">
                            {title}
                        </Link>
                        <br />
                        <br />
                        <Button variant={"outlined"} onClick={openShareDialog}>
                            שיתוף
                        </Button>
                        <ShareDialog
                            open={open}
                            onClose={closeShareDialog}
                            urlToShare={link}
                        />
                    </AccordionDetails>
                </Accordion>
            </Box>
        </ThemeProvider>
    );
}

export default ResultAccordion;
