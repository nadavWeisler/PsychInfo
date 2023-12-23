"use client";
import { useState } from "react";
import WelcomeMsg from "@/app/[lng]/Components/WelcomeMsg";
import { Provider } from "react-redux";
import store from "@/store";
import { Button } from "@mui/material";
import OrgWizard from "@/app/[lng]/Components/OrgWizard";

export default function HomePage() {
    const [openOrg, setOpenOrg] = useState(false);

    return (
        <Provider store={store}>
            <WelcomeMsg />
            <Button
                sx={{ mr: 70 }}
                variant={"contained"}
                onClick={() => setOpenOrg(true)}
            >
                התחלה
            </Button>
            <OrgWizard open={openOrg} onClose={() => setOpenOrg(false)} />
        </Provider>
    );
}
