import { Typography, Box, TextField, FormControl, InputLabel, Grid, Chip, Link } from "@mui/material";
import { Content, DisplayLanguages } from "@/app/[lng]/general/interfaces";
import { ifValidLink, isEmptyOrSpaces } from "@/app/[lng]/general/utils";
import { useParams } from "next/navigation";
import { LocaleTypes } from "@/i18n/settings";
import { useTranslation } from "@/i18n/client";

export default function AccordionContent({ link, tags, organization, description, languageId }: Content) {
    const locale = useParams()?.locale as LocaleTypes;
    const { t } = useTranslation(locale, "translation");

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "auto"
        }}>
            {
                (!isEmptyOrSpaces(link) && ifValidLink(link)) ?
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
};