"use client";
import { Fragment, useState } from "react";
import { ThemeProvider } from "@mui/material";
import Wizrad from "@/app/Components/Wizard/Wizard";
import WelcomeMsg from "@/app/Components/UI/WelcomeMsg";
import { darkTheme } from "@/app/General/styles";
import { Provider } from "react-redux";
import store from "@/app/store";
import { Filter } from "./General/interfaces";
import Gallary from "./Components/gallary/gallary";
import { get } from "http";
import { GetFilters } from "./general/utils";


function HomePage() {
    const [open, setOpen] = useState(false);

    const openWizradHandler = () => {
        setOpen(true);
    };

    const closeWizradHandler = () => {
        setOpen(false);
    };

    const filters: Filter[] = GetFilters();
    console.log(filters);

    return (
        <Provider store={store}>
            <Fragment>
                <ThemeProvider theme={darkTheme}>
                    <Wizrad open={open} onClose={closeWizradHandler} />
                    <WelcomeMsg openWizradHandler={openWizradHandler} />
                    <Gallary filters={filters} />
                </ThemeProvider>
            </Fragment>
        </Provider>
    );
}

export default HomePage;
