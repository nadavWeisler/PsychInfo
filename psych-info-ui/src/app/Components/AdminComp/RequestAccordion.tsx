"use client";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    Link,
    Box,
    Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { RequestAccordionProps, Language } from "@/app/general/interfaces";
import AccordionContent from "@/app/Components/ResultComp/AccordionContent";
import { darkTheme } from "@/app/General/styles";

function RequestAccordion({
    title = "",
    link = "",
    tags = [],
    organization = { id: "", display: "", used: false },
    description = "",
    language = Language.Hebrew,
    uploader = "",
    deleteHandler = () => null,
}: RequestAccordionProps) {
    const deleteRequest = async () => {
        // await deleteFromDB(path);
        deleteHandler();
    };
    return (
        <Box
            sx={{
                width: "60%",
                margin: "auto",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Accordion sx={{ backgroundColor: "#42a5f5" }}>
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
                    <Button
                        color={"error"}
                        variant={"outlined"}
                        onClick={deleteRequest}
                    >
                        מחק
                    </Button>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
export default RequestAccordion;
