import { ifValidLink, isEmptyOrSpaces } from "@/app/[lng]/general/utils";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import { Box, Link } from "@mui/material";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { ArticleCardContentLinkProps } from "@/app/[lng]/general/interfaces";

export default function ArticleCardLink({ link }: ArticleCardContentLinkProps) {
    const { t, direction } = useTrans();
    return (
        <>
            {!isEmptyOrSpaces(link) && ifValidLink(link) ? (
                <Box component={"div"} dir={direction}>
                    <Link
                        data-testid="link"
                        dir={direction}
                        margin={"15px"}
                        href={link}
                        target="_blank"
                        rel="noopener"
                    >
                        {t(LocalizationKeys.Common.LinkTitle)}
                    </Link>
                </Box>
            ) : null}
        </>
    );
}
