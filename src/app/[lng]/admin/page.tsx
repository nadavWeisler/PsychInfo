"use client";
import { useContext, useEffect, Fragment } from "react";
import { useParams, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import IncomingRequests from "@/app/[lng]/Components/AdminComp/IncomingRequests";
import IncomingMistakes from "@/app/[lng]/Components/AdminComp/IncomingMistakes";
import { auth } from "@/app/[lng]/firebase/app";
import { AuthContext } from "@/app/[lng]/context/AuthContext";
import { Button, Box } from "@mui/material";
import { LocaleTypes } from "@/i18n/settings";
import { useTranslation } from "@/i18n/client";

export default function AdminPage() {
    const locale = useParams()?.locale as LocaleTypes;
    const { t } = useTranslation(locale, "translation"); 
    
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/");
            }
        });
    }, [user]);

    function logoutHandler(): void {
        signOut(auth)
            .then(() => {
                router.push("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        user ?
            <Fragment>
                <IncomingRequests />
                <IncomingMistakes />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                    }}
                >
                    <Button
                        onClick={logoutHandler}
                        sx={{ margin: "auto" }}
                        variant={"contained"}
                    >
                        {t("common.logout")}
                    </Button>
                </Box>
            </Fragment>
            : null
    )
};