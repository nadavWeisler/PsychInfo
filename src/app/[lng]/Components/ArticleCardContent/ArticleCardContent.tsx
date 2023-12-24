import { Box } from "@mui/material";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { ArticleCardContentProps } from "@/app/[lng]/general/interfaces";
import ArticleCardTexts from "@/app/[lng]/Components/ArticleCardTexts";
import ArticleCardLink from "@/app/[lng]/Components/ArticleCardLink";
import ArticleCardTags from "@/app/[lng]/Components/ArticleCardTags";
import ArticleCardFile from "@/app/[lng]/Components/ArticleCardFile";

export default function ArticleCardContent({
    article,
}: ArticleCardContentProps) {
    const { direction } = useTrans();

    return (
        <Box dir={direction}>
            <ArticleCardTexts
                title={article?.title}
                description={article?.description}
            />
            <ArticleCardLink link={article?.link} />
            <ArticleCardTags tags={article?.tags} />
            <ArticleCardFile isFile={article?.isFile} title={article?.title} />
        </Box>
    );
}
