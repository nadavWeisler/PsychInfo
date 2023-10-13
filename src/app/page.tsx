"use client";
import { Fragment, useState } from "react";
import { Container } from "@mui/material";
import Wizrad from "@/app/[lng]/Components/Wizard/Wizard";
import WelcomeMsg from "@/app/[lng]/Components/UI/WelcomeMsg";
import { Provider } from "react-redux";
import store from "@/store";
import { Filter } from "./[lng]/general/interfaces";
import Gallary from "./[lng]/Components/gallary/gallary";
import { GetFilters } from "./[lng]/general/utils";

function HomePage({ params: { lng } }: { params: { lng: string } }) {
    const [open, setOpen] = useState(false);

    const openWizradHandler = () => {
        setOpen(true);
    };

    const closeWizradHandler = () => {
        setOpen(false);
    };

    const filters: Filter[] = GetFilters();

    return (
        <Provider store={store}>
            <Fragment>
                <Container component="main" maxWidth="md">
                    <Wizrad open={open} onClose={closeWizradHandler} />
                    <WelcomeMsg
                        lng={lng}
                        openWizradHandler={openWizradHandler}
                    />
                    <Gallary filters={filters} />
                </Container>
            </Fragment>
        </Provider>
    );
}

export default HomePage;
