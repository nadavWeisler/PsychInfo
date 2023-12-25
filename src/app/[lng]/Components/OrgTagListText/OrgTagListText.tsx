import React, { Fragment } from "react";
import { Typography, ListItemText } from "@mui/material";
import { styles } from "@/app/[lng]/Components/OrgTagListText/OrgTagListText.style";
import { OrgTagListTextProps } from "@/app/[lng]/general/interfaces";

export default function OrgTagListText({
    labelId,
    value,
}: OrgTagListTextProps) {
    return (
        <ListItemText
            id={labelId}
            primary={
                <Fragment>
                    {Object.keys(value).map((key, index) => (
                        <Typography sx={styles.typ} key={index}>
                            {`${key}: `}
                            <Typography component={"span"}>
                                {value[key as keyof typeof value].toString()}
                            </Typography>
                        </Typography>
                    ))}
                </Fragment>
            }
        />
    );
}
