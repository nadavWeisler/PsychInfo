"use client";
import { useEffect, useState } from "react";
import { ArticleCardFileProps } from "@/app/[lng]/general/interfaces";
import { getFiles } from "@/app/[lng]/firebase/commands";
import { Box } from "@mui/material";
import useTrans from "@/app/[lng]/hooks/useTrans";

export default function ArticleCardFile({
    isFile,
    title,
}: ArticleCardFileProps) {
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    const { direction } = useTrans();

    useEffect(() => {
        if (isFile) {
            getFiles(title).then((file) => {
                setFileUrl(file);
            });
        }
    }, [isFile]);
    return (
        <>
            {isFile ? (
                <Box component={"div"} dir={direction}>
                    <img
                        data-testid="image"
                        src={fileUrl || ""}
                        alt={""}
                        width="20%"
                        height="20%"
                    />
                </Box>
            ) : null}
        </>
    );
}
