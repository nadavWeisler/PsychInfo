"use client";
import { Fragment, useState } from "react";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import Wizrad from "@/app/Components/Wizard/Wizard";
import WelcomeMsg from "@/app/Components/UI/WelcomeMsg";
import { darkTheme } from "@/app/General/styles";
import { Provider } from "react-redux";
import store from "@/app/store";

function HomePage() {
    const [open, setOpen] = useState(false);

    const openWizradHandler = () => {
        setOpen(true);
    };

    const closeWizradHandler = () => {
        setOpen(false);
    };
    return (
        <Provider store={store}>
            <Fragment>
                <ThemeProvider theme={darkTheme}>
                    <Wizrad open={open} onClose={closeWizradHandler} />
                    <WelcomeMsg openWizradHandler={openWizradHandler} />
                </ThemeProvider>
            </Fragment>
        </Provider>
    );
}

export default HomePage;
