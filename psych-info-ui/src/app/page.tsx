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


function HomePage() {
    const [open, setOpen] = useState(false);

    const openWizradHandler = () => {
        setOpen(true);
    };

    const closeWizradHandler = () => {
        setOpen(false);
    };

    const filters: Filter[] = [
        {
            title: "title1",
            description: "description1",
            id: "id1",
            img: "https://picsum.photos/200/300",
            language: "English",
            organization: "organization1",
            tags: ["tag1", "tag2"],
        }, 
        {
            title: "title1",
            description: "description1",
            id: "id1",
            img: "https://picsum.photos/200/300",
            language: "English",
            organization: "organization1",
            tags: ["tag1", "tag2"],
        }, 
    ]
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
