"use client";
import { Box, Button } from "@mui/material";
import { useAppDispatch } from "@/app/[lng]/hooks/redux";
import { isStateActions } from "@/store/isStateSlice";
import { LocalizationKeys } from "@/i18n/LocalizationKeys";
import useTrans from "@/app/[lng]/hooks/useTrans";
import ControlPanel from "@/app/[lng]/Components/ControlPanel";
import { styles } from "@/app/[lng]/Components/AdminContent/AdminContent.style";
import { signOut } from "@firebase/auth";
import { auth } from "@/app/[lng]/firebase/app";
import { useRouter } from "next/navigation";
import { AdminContentProps } from "@/app/[lng]/general/interfaces";

export default function AdminContent({ isDelete }: AdminContentProps) {
    const { t } = useTrans();
    const router = useRouter();
    const dispatch = useAppDispatch();

    function logoutHandler(): void {
        signOut(auth)
            .then(() => {
                router.push("/");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Box sx={styles.box}>
            <ControlPanel
                isDeleteHandler={() => dispatch(isStateActions.setIsDelete())}
                isDelete={isDelete}
            />
            <Button
                onClick={logoutHandler}
                sx={styles.button}
                variant={"contained"}
            >
                {t(LocalizationKeys.Common.Logout)}
            </Button>
        </Box>
    );
}
