"use client";
import { useState, useEffect, Fragment } from "react";
import { FoundMistakeDB } from "@/app/[lng]/general/interfaces";
import { Typography } from "@mui/material";
import { getMistakes } from "@/app/[lng]/firebase/commands";
import FoundMistakeAccordion from "@/app/[lng]/Components/FoundMistake/FoundMistakeAccordion";

function IncomingMistakes() {
    const [mistakes, setMistakes] = useState<FoundMistakeDB[]>([]);
    const [isDelete, setIsDelete] = useState(false);

    const deleteHandler = () => {
        setIsDelete(!isDelete);
    };

    useEffect(() => {
        getMistakes()
            .then((mistakes) => {
                setMistakes(mistakes);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [isDelete]);

    return (
        <Fragment>
            <Typography
                sx={{ mt: 3, mb: 5 }}
                align={"center"}
                variant="h2"
                color={"black"}
            >
                טעויות ממתינות
            </Typography>
            {mistakes.map((mistake, index) => (
                <Fragment key={index}>
                    <FoundMistakeAccordion
                        id={mistake.id}
                        name={mistake.name}
                        emailToContact={mistake.emailToContact}
                        description={mistake.description}
                        deleteHandler={deleteHandler}
                    />
                    <br />
                </Fragment>
            ))}
        </Fragment>
    );
}

export default IncomingMistakes;
