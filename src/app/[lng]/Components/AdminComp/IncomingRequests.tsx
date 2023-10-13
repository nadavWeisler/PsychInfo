"use client";
import { useState, useEffect, Fragment } from "react";
import { Content } from "@/app/[lng]/general/interfaces";
import { Typography } from "@mui/material";
import RequestAccordion from "@/app/[lng]/Components/AdminComp/RequestAccordion";
import { getPendingContent } from "@/app/[lng]/firebase/commands";
import { useTranslation } from "@/i18n/client";
import { LocaleTypes } from "@/i18n/settings";
import { useParams } from "next/navigation";


export default function IncomingRequests() {
    const locale = useParams()?.locale as LocaleTypes;
    const { t } = useTranslation(locale, "translation");

    const [requests, setRequests] = useState<Content[]>([]);
    const [isDelete, setIsDelete] = useState<boolean>(false);

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
                variant="h4"
                color={"black"}
            >
                {t("admin.waiting_requests")}
            </Typography>
            {(requests && requests.length > 0) ?
                requests.map((request, index) => (
                    <Fragment key={index}>
                        <RequestAccordion
                            id={request.id}
                            title={request.title}
                            link={request.link}
                            tags={request.tags}
                            organization={request.organization}
                            description={request.description}
                            languageId={request.languageId}
                            uploader={request.uploader}
                            deleteHandler={() => setIsDelete(!isDelete)}
                        />
                    </Fragment>
                )) :
                <Typography
                    sx={{ mt: 3, mb: 5 }}
                    align={"center"}
                    variant="h4"
                    color={"black"}
                >
                    {t("admin.no_mistaeks")}
                </Typography>
            }
        </Fragment >
    );
}