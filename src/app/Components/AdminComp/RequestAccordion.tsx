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
import { RequestAccordionProps } from "@/app/general/interfaces";
import AccordionContent from "@/app/Components/ResultComp/AccordionContent";
import { deletePendingContent, createContent } from "@/app/firebase/commands";

function RequestAccordion({
    title = "",
    link = "",
    tags = [],
    organization = { id: "", display: "", used: false },
    description = "",
    language = { id: "", display: "", used: false },
    uploader = "",
    deleteHandler = () => null,
}: RequestAccordionProps) {
    const deleteRequest = async () => {
        deletePendingContent(title);
        deleteHandler();
    };
    const aproveRequest = async () => {
        const content = {
            title,
            link,
            tags,
            organization,
            description,
            language,
            uploader,
        };
        await createContent(content);
        deletePendingContent(title);
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
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Button
                            sx={{ marginLeft: "20px" }}
                            color={"error"}
                            variant={"outlined"}
                            onClick={deleteRequest}
                        >
                            מחק
                        </Button>
                        <Button
                            color={"success"}
                            variant={"contained"}
                            onClick={aproveRequest}
                        >
                            אשר
                        </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
export default RequestAccordion;
