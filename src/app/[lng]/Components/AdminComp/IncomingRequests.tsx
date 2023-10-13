"use client";
import { useState, useEffect, Fragment } from "react";
import { Content } from "@/app/[lng]/general/interfaces";
import { Typography } from "@mui/material";
import RequestAccordion from "@/app/[lng]/Components/AdminComp/RequestAccordion";
import { getPendingContent } from "@/app/[lng]/firebase/commands";

function IncomingRequests() {
    const [requests, setRequests] = useState<Content[]>([]);
    const [isDelete, setIsDelete] = useState(false);

    const deleteHandler = () => {
        setIsDelete(!isDelete);
    };

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
                variant="h2"
                color={"black"}
            >
                בקשות ממתינות
            </Typography>
            {requests.map((request, index) => (
                <Fragment key={index}>
                    <RequestAccordion
                        title={request.title}
                        link={request.link}
                        tags={request.tags}
                        organization={request.organization}
                        description={request.description}
                        languageId={request.languageId}
                        uploader={request.uploader}
                        deleteHandler={deleteHandler}
                    />
                    <br />
                </Fragment>
            ))}
        </Fragment>
    );
}

export default IncomingRequests;
