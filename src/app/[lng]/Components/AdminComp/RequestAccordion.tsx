"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import { RequestAccordionProps, Content } from "@/app/[lng]/general/interfaces";
import AccordionContent from "@/app/[lng]/Components/ResultComp/AccordionContent";
import {
    deletePendingContent,
    createContent,
} from "@/app/[lng]/firebase/commands";
import useTrans from "@/app/[lng]/hooks/useTrans";
import styles from "@/app/[lng]/Components/ResultComp/Accordion.module.css";

export default function RequestAccordion({
    data,
    deleteHandler,
}: RequestAccordionProps) {
    const [accordionItems, setAccordionItems] = useState(
        data.map((item) => ({
            title: item.title,
            link: item.link,
            tags: item.tags,
            organization: item.organization,
            description: item.description,
            languageId: item.languageId,
            uploader: item.uploader,
            id: item.id,
            open: false,
        }))
    );

    const { t } = useTrans();

    const handleClick = (index: number) => {
        const newAccordion = [...accordionItems];
        newAccordion[index].open = !newAccordion[index].open;
        setAccordionItems(newAccordion);
    };

    async function deleteRequest(index: number): Promise<void> {
        await deletePendingContent(data[index].title);
        deleteHandler();
    }

    async function aproveRequest(index: number): Promise<void> {
        const content: Content = {
            ...data[index],
        };
        await createContent(content);
        deletePendingContent(data[index].title);
        deleteHandler();
    }

    return (
        <>
            <Box sx={{ margin: "auto" }}>
                {accordionItems.map((item, index) => (
                    <div key={index}>
                        <div
                            className={styles.title}
                            onClick={() => handleClick(index)}
                        >
                            <div className={styles.arrowWrapper}>
                                <i
                                    className={` ${styles.fa} ${
                                        styles.faAngleDown
                                    } ${item.open ? styles.rotate : ""}`}
                                ></i>
                            </div>
                            <span className={styles.titleText}>
                                {item.title}
                            </span>
                        </div>
                        <div
                            className={`${styles.content} ${
                                item.open ? styles.contentOpen : ""
                            }`}
                        >
                            <div
                                className={`${styles.contentText} ${
                                    item.open ? styles.contentTextOpen : ""
                                }`}
                            >
                                <AccordionContent
                                    data={data[index]}
                                    request={true}
                                    deleteRequest={() => deleteRequest(index)}
                                    aproveRequest={() => aproveRequest(index)}
                                />
                            </div>
                        </div>
                        <br />
                    </div>
                ))}
            </Box>
        </>
        // <Box
        //     sx={{
        //         width: "60%",
        //         margin: "auto",
        //         justifyContent: "center",
        //         alignItems: "center",
        //     }}
        // >
        //     <Accordion sx={{ backgroundColor: "#42a5f5" }}>
        //         <AccordionSummary
        //             expandIcon={<ExpandMoreIcon />}
        //             aria-controls="panel1a-content"
        //             id="panel1a-header"
        //         >
        //             <Typography>{data.title}</Typography>
        //         </AccordionSummary>
        //         <AccordionDetails>
        //             <AccordionContent
        //                 data={data}
        //                 request={true}
        //                 deleteRequest={deleteRequest}
        //                 aproveRequest={aproveRequest}
        //             />
        //         </AccordionDetails>
        //     </Accordion>
        // </Box>
    );
}
