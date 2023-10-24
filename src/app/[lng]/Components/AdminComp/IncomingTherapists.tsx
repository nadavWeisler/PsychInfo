"use client";
import { useState, useEffect, Fragment } from "react";
import { RegisterFormDB } from "@/app/[lng]/general/interfaces";
import { Box, Typography } from "@mui/material";
import TherapistsAccordion from "@/app/[lng]/Components/Therapists/TherapistsAccordion";
import { getTherapist } from "@/app/[lng]/firebase/commands";
import useTrans from "@/app/[lng]/hooks/useTrans";

export default function IncomingTherapists() {
    const [therapists, setTherapists] = useState<RegisterFormDB[]>([]);
    const [isDelete, setIsDelete] = useState<boolean>(false);

    const { t } = useTrans();

    useEffect(() => {
        getTherapist()
            .then((therapists) => {
                setTherapists(therapists);
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
                variant="h5"
                color={"black"}
            >
                {t("admin.therapists")}
            </Typography>
            {therapists && therapists.length > 0 ? (
                <Box sx={{ marginBottom: "10px" }}>
                    <TherapistsAccordion
                        data={therapists}
                        deleteHandler={() => setIsDelete(!isDelete)}
                    />
                </Box>
            ) : (
                <Typography
                    sx={{ mt: 3, mb: 5 }}
                    align={"center"}
                    variant="h6"
                    color={"black"}
                >
                    {t("admin.no_therapists")}
                </Typography>
            )}
        </Fragment>
    );
}
