"use client";
import { Typography, Box, Chip, Link, Grid } from "@mui/material";
import { Content, DisplayLanguages } from "@/app/[lng]/general/interfaces";
import { ifValidLink, isEmptyOrSpaces } from "@/app/[lng]/general/utils";
import useTrans from "@/app/[lng]/hooks/useTrans";

export default function AccordionContent({
    link,
    tags,
    organization,
    description,
    languageId,
}: Content) {
    const { t, direction } = useTrans();

    return (
        <Box
            dir={direction}
            sx={{
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
            }}
        >
            {!isEmptyOrSpaces(link) && ifValidLink(link) ? (
                <Box
                    dir={direction}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Typography
                        dir={direction}
                        sx={{ margin: "10px" }}
                        variant="h6"
                    >
                        {t("common.link")}:
                    </Typography>
                    <Link
                        dir={direction}
                        margin={"15px"}
                        href={link}
                        target="_blank"
                        rel="noopener"
                        sx={{
                            color: "blue",
                            textDecoration: "underline",
                        }}
                    >
                        {link}
                    </Link>
                </Box>
            ) : (
                <Box
                    dir={direction}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Typography
                        dir={direction}
                        sx={{ margin: "10px" }}
                        variant="h6"
                    >
                        {t("common.link")}:
                    </Typography>
                    <Typography
                        dir={direction}
                        sx={{ margin: "10px", color: "red" }}
                        variant="h6"
                    >
                        {t("common.invalid_link")} - {link}
                    </Typography>
                </Box>
            )}
            <Box
                dir={direction}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Typography
                    dir={direction}
                    sx={{ margin: "10px" }}
                    variant="h6"
                >
                    {t("common.organization")}:&nbsp;
                </Typography>
                {[organization].map((org) => (
                    <Chip
                        sx={{ margin: "10px" }}
                        key={org.id}
                        label={org.display}
                        variant="outlined"
                    />
                ))}
            </Box>
            <Box
                dir={direction}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Typography
                    dir={direction}
                    sx={{ margin: "10px" }}
                    variant="h6"
                >
                    {t("common.language")}:
                </Typography>
                {[languageId].map((lang) => (
                    <Chip
                        sx={{ margin: "10px" }}
                        key={lang}
                        label={
                            DisplayLanguages[
                            lang as keyof typeof DisplayLanguages
                            ]
                        }
                        variant="outlined"
                    />
                ))}
            </Box>
            <Box
                dir={direction}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Typography
                    dir={direction}
                    sx={{ margin: "10px" }}
                    variant="h6"
                >
                    {t("common.tags")}:
                </Typography>
                <Grid spacing={4} marginTop={"10px"}>
                    {tags.map((tag) => (
                        <Chip
                            sx={{ marginRight: "5px", marginTop: "3px" }}
                            key={tag.id}
                            label={tag.display}
                            variant="outlined"
                        />
                    ))}
                </Grid>
            </Box>
            <Box
                dir={direction}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Typography
                    dir={direction}
                    sx={{ margin: "10px" }}
                    variant="h6"
                >
                    {t("common.description")}:
                </Typography>
                <Typography
                    dir={direction}
                    sx={{ margin: "10px" }}
                    variant="h6"
                >
                    {description}
                </Typography>
            </Box>
        </Box>
    );
}
