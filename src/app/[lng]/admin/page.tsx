"use client";
import { useContext, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import IncomingRequests from "@/app/[lng]/Components/AdminComp/IncomingRequests";
import IncomingMistakes from "@/app/[lng]/Components/AdminComp/IncomingMistakes";
import { auth } from "@/app/[lng]/firebase/app";
import { AuthContext } from "@/app/[lng]/context/AuthContext";
import { Button, Box } from "@mui/material";
function AdminPage() {
    const { user } = useContext(AuthContext);

    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/");
            }
        });
    }, [user]);

    const logoutHandler = () => {
        signOut(auth)
            .then(() => {
                router.push("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (!user) {
        return null;
    }
    return (
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
                    התנתק
                </Button>
            </Box>
        </Fragment>
    );
}

export default AdminPage;
