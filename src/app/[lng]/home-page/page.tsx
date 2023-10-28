"use client";
import { useState } from "react";
import Wizrad from "@/app/[lng]/Components/Wizard/Wizard";
import WelcomeMsg from "@/app/[lng]/Components/UI/WelcomeMsg";
import { Filter } from "@/app/[lng]/general/interfaces";
import Gallary from "@/app/[lng]/Components/gallary/gallary";
import { GetFilters } from "@/app/[lng]/general/utils";
import { Provider } from "react-redux";
import store from "@/store";

export default function HomePage() {
    const [open, setOpen] = useState(false);

    const openWizradHandler = () => {
        setOpen(true);
    };

    const closeWizradHandler = () => {
        setOpen(false);
    };

    const filters: Filter[] = GetFilters();

    return (
        <>
            <Provider store={store}>
                <WelcomeMsg openWizradHandler={openWizradHandler} />
                <Wizrad open={open} onClose={closeWizradHandler} />
                <Gallary filters={filters} />
            </Provider>
        </>
    );
}
