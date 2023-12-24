"use client";
import { useState } from "react";
import { Paper, Card, CardContent, CardActions } from "@mui/material";
import ShareDialog from "@/app/[lng]/Components/ShareDialog";
import EditContentDialog from "@/app/[lng]/Components/EditContentDialog";
import { SingleArticleProps } from "@/app/[lng]/general/interfaces";
import { deleteContent } from "@/app/[lng]/firebase/commands";
import ArticleCardContent from "@/app/[lng]/Components/ArticleCardContent";
import ArticleCardActions from "@/app/[lng]/Components/ArticleCardActions";

export default function SingleArticle({ article }: SingleArticleProps) {
    const [openShare, setOpenShare] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState(false);

    const deleteSelectedContent = async () => {
        await deleteContent(article?.id);
        window.location.reload();
    };

    return (
        <Paper elevation={3}>
            <Card>
                <CardContent>
                    <ArticleCardContent article={article} />
                </CardContent>
                {
                    <CardActions>
                        <ArticleCardActions
                            id={article?.id}
                            setOpenShare={setOpenShare}
                            deleteSelectedContent={deleteSelectedContent}
                            setOpenEdit={setOpenEdit}
                        />
                    </CardActions>
                }
            </Card>

            <ShareDialog
                open={openShare}
                onClose={() => setOpenShare(false)}
                urlToShare={article?.link}
            />

            <EditContentDialog
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                prevContent={article}
            />
        </Paper>
    );
}
