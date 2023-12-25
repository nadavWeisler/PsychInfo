import { IconButton } from "@mui/material";
import { Delete, Edit, Share } from "@mui/icons-material";
import useAuth from "@/app/[lng]/hooks/useAuth";
import { deleteContent } from "@/app/[lng]/firebase/commands";
import { ArticleCardActionsProps } from "@/app/[lng]/general/interfaces";

export default function ArticleCardActions({
    id,
    setOpenShare,
    setOpenEdit,
}: ArticleCardActionsProps) {
    const { authUser } = useAuth();

    const deleteSelectedContent = async () => {
        await deleteContent(id);
        window.location.reload();
    };
    return (
        <>
            <IconButton onClick={() => setOpenShare(true)}>
                <Share />
            </IconButton>
            {authUser ? (
                <>
                    <IconButton onClick={deleteSelectedContent}>
                        <Delete />
                    </IconButton>
                    <IconButton onClick={() => setOpenEdit(true)}>
                        <Edit />
                    </IconButton>
                </>
            ) : null}
        </>
    );
}
