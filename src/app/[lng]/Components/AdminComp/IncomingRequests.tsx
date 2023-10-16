"use client";
import { useState, useEffect, Fragment } from "react";
import { Content } from "@/app/[lng]/general/interfaces";
import { Box, Typography } from "@mui/material";
import RequestAccordion from "@/app/[lng]/Components/AdminComp/RequestAccordion";
import { getPendingContent } from "@/app/[lng]/firebase/commands";
import useTrans from "@/app/[lng]/hooks/useTrans";

export default function IncomingRequests() {
    const [requests, setRequests] = useState<Content[]>([]);
    const [isDelete, setIsDelete] = useState<boolean>(false);

    const { t } = useTrans();

    useEffect(() => {
        getPendingContent()
            .then((requests) => {
                setRequests(requests);
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
                {t("admin.waiting_requests")}
            </Typography>
            {requests && requests.length > 0 ? (
                requests.map((request, index) => (
                    <Box key={index} sx={{ marginBottom: "10px" }}>
                        <RequestAccordion
                            data={request}
                            deleteHandler={() => setIsDelete(!isDelete)}
                        />
                    </Box>
                ))
            ) : (
                <Typography
                    sx={{ mt: 3, mb: 5 }}
                    align={"center"}
                    variant="h6"
                    color={"black"}
                >
                    {t("admin.no_mistakes")}
                </Typography>
            )}
        </Fragment>
    );
}
