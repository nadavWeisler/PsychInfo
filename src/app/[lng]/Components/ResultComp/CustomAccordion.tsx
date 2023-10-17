import React, { useState } from "react";
import { Box } from "@mui/material";
import AccordionContent from "@/app/[lng]/Components/ResultComp/AccordionContent";
import styles from "@/app/[lng]/Components/ResultComp/Accordion.module.css";
import { CustomAccordionProps } from "@/app/[lng]/general/interfaces";

export default function CustomAccordion({ data }: CustomAccordionProps) {
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

    const handleClick = (index: number) => {
        const newAccordion = [...accordionItems];
        newAccordion[index].open = !newAccordion[index].open;
        setAccordionItems(newAccordion);
    };

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
                                    request={false}
                                />
                            </div>
                        </div>
                        <br />
                    </div>
                ))}
            </Box>
        </>
    );
}
