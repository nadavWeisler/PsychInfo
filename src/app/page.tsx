"use client";
import { Fragment, useState } from "react";
import Wizrad from "@/app/[lng]/Components/Wizard/Wizard";
import WelcomeMsg from "@/app/[lng]/Components/UI/WelcomeMsg";
import { Provider } from "react-redux";
import store from "@/store";
import { Filter } from "./[lng]/general/interfaces";
import Gallary from "./[lng]/Components/gallary/gallary";
import { GetFilters } from "@/app/[lng]/general/utils";
import { LocaleTypes } from "@/i18n/settings";

function HomePage({ params: { lng } }: { params: { lng: LocaleTypes } }) {
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
                <Wizrad open={open} onClose={closeWizradHandler} />
                <WelcomeMsg lng={lng} openWizradHandler={openWizradHandler} />
                <Gallary filters={filters} />
            </Fragment>
        </Provider>
    );
}

export default HomePage;
