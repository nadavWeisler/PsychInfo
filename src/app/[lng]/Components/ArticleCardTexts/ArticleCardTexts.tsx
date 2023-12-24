import { Box, Typography } from "@mui/material";
import { styles } from "@/app/[lng]/Components/ArticleCardTexts/ArticleCardTexts.style";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { ArticleCardTextsProps } from "@/app/[lng]/general/interfaces";

export default function ArticleCardTexts({
    title,
    description,
}: ArticleCardTextsProps) {
    const { direction } = useTrans();

    const textArray = [
        {
            dataTestId: "title",
            text: title,
            variant: "h4" as const,
            style: undefined,
        },
        {
            dataTestId: "description-title",
            text: description,
            variant: "h6" as const,
            style: styles.descriptionText,
        },
    ];
    return (
        <Box dir={direction}>
            {textArray.map((text, index) => (
                <Typography
                    key={index}
                    sx={text.style}
                    data-testid={text.dataTestId}
                    component={"div"}
                    dir={direction}
                    variant={text.variant}
                >
                    {text.text}
                </Typography>
            ))}
        </Box>
    );
}
