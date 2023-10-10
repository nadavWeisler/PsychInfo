"use client";
import { useState, useEffect, Fragment } from "react";
import { Content } from "@/app/general/interfaces";
import { Typography } from "@mui/material";
import RequestAccordion from "@/app/Components/AdminComp/RequestAccordion";
import { getPendingContent } from "@/app/firebase/commands";

const getRequests = (): Content[] => {
    const dummyRequests: Content[] = [
        {
            title: "Request 1",
            link: "https://www.example.com/request1",
            tags: [
                { id: "טאג1", display: "טאג1", used: false },
                { id: "טאג2", display: "טאג2", used: false },
            ],
            organization: { id: "ארגון1", display: "ארגון1", used: false },
            description: "This is the first request",
            language: "English",
            uploader: "User 1",
        },
        {
            title: "Request 2",
            link: "https://www.example.com/request2",
            tags: [
                { id: "טאג3", display: "טאג3", used: false },
                { id: "טאג4", display: "טאג4", used: false },
            ],
            organization: { id: "ארגון2", display: "ארגון2", used: false },
            description: "This is the second request",
            language: "Hebrew",
            uploader: "User 2",
        },
        {
            title: "Request 3",
            link: "https://www.example.com/request3",
            tags: [
                { id: "טאג5", display: "טאג5", used: false },
                { id: "טאג6", display: "טאג6", used: false },
            ],
            organization: { id: "ארגון3", display: "ארגון3", used: false },
            description: "This is the third request",
            language: "Arabic",
            uploader: "User 3",
        },
    ];
    return dummyRequests;
};

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
                        language={request.language}
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
