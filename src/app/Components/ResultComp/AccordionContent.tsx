import { Typography, Box, TextField, FormControl, InputLabel, Grid, Chip, Link } from "@mui/material";
import { Content, DisplayLanguages } from "@/app/general/interfaces";
import { useTranslation } from "react-i18next";
import { Select } from "react-i18next/icu.macro";
import { ifValidLink, isEmptyOrSpaces } from "@/app/general/utils";

function AccordionContent({
    title = "",
    link = "",
    tags = [],
    organization = { id: "", display: "", used: false, languageId: "" },
    description = "",
    languageId = ""
}: Content) {
    const { t } = useTranslation();
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "auto"
        }}>
            {
                !isEmptyOrSpaces(link) && ifValidLink(link) ?
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}>
                        <Typography sx={{ margin: "10px" }} variant="h6">
                            {t("common.link")}:
                        </Typography>
                        <Link
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
                    </Box> :
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}>
                        <Typography sx={{ margin: "10px" }} variant="h6">
                            {t("common.link")}:
                        </Typography>
                        <Typography sx={{ margin: "10px", color: "red" }} variant="h6">
                            {t("common.invalid_link")} - {link}
                        </Typography>
                    </Box>
            }
            <Box sx={{
                display: "flex",
                flexDirection: "row",
            }}>
                <Typography sx={{ margin: "10px", }} variant="h6">
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
            <Box sx={{
                display: "flex",
                flexDirection: "row",
            }}>
                <Typography sx={{ margin: "10px" }} variant="h6">
                    {t("common.language")}:
                </Typography>

                {[languageId].map((lang) => (
                    <Chip
                        sx={{ margin: "10px" }}
                        key={lang}
                        label={DisplayLanguages[lang as keyof typeof DisplayLanguages]}
                        variant="outlined"
                    />
                ))}
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
            }}>
                <Typography sx={{ margin: "10px" }} variant="h6">
                    {t("common.tags")}:
                </Typography>
                {tags.map((tag) => (
                    <Chip
                        sx={{ margin: "10px" }}
                        key={tag.id}
                        label={tag.display}
                        variant="outlined"
                    />
                ))}
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
            }}>
                <Typography sx={{ margin: "10px" }} variant="h6">
                    {t("common.description")}:
                </Typography>
                <Typography sx={{ margin: "10px" }} variant="h6">
                    {description}
                </Typography>
            </Box>
        </Box >
    );
}

export default AccordionContent;
