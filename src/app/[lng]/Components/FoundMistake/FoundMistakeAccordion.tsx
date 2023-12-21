"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import FoundMistakeAccordionContent from "@/app/[lng]/Components/FoundMistake/FoundMistakeAccordionContent";
import { FoundMistakeAccordionProps } from "@/app/[lng]/general/interfaces";
import useTrans from "@/app/[lng]/hooks/useTrans";
import styles from "@/app/[lng]/Components/ResultComp/Accordion.module.css";

export default function FoundMistakeAccordion({
  deleteHandler,
  data,
}: FoundMistakeAccordionProps) {
  const { t, direction } = useTrans();

  const [accordionItems, setAccordionItems] = useState(
    data.map((item) => ({
      name: item.name,
      emeilToContact: item.emailToContact,
      description: item.description,
      id: item.id,
      open: false,
    })),
  );

  const handleClick = (index: number) => {
    const newAccordion = [...accordionItems];
    newAccordion[index].open = !newAccordion[index].open;
    setAccordionItems(newAccordion);
  };

  return (
    <Box sx={{ margin: "auto" }}>
      {accordionItems.map((item, index) => (
        <div key={index}>
          <div className={styles.title} onClick={() => handleClick(index)}>
            <div className={styles.arrowWrapper}>
              <i
                className={` ${styles.fa} ${styles.faAngleDown} ${
                  item.open ? styles.rotate : ""
                }`}
              ></i>
            </div>
            <span className={styles.titleText}>{`${t(
              "common.reported_mistake",
            )}: ${item.id}`}</span>
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
              <FoundMistakeAccordionContent
                data={data[index]}
                deleteHandler={deleteHandler}
              />
            </div>
          </div>
          <br />
        </div>
      ))}
    </Box>
  );
}
