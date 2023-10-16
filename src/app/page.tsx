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
import TrialAccordion from "@/app/[lng]/Components/ResultComp/CustomAccordion";
import { Content } from "@/app/[lng]/general/interfaces";

const dummyData: Content[] = [
    {
        title: "Dummy Title 1",
        link: "https://dummylink1.com",
        tags: [
            {
                id: "1",
                display: "tags1",
                used: true,
                languageId: "en",
            },
            {
                id: "2",
                display: "tags2",
                used: true,
                languageId: "en",
            },
        ],
        organization: {
            id: "1",
            display: "Dummy Organization 1",
            used: true,
            languageId: "en",
        },
        description: "This is a dummy description 1",
        languageId: "en",
        uploader: "Dummy Uploader 1",
        id: "1",
    },
    {
        title: "Dummy Title 2",
        link: "https://dummylink2.com",
        tags: [
            {
                id: "3",
                display: "tags3",
                used: true,
                languageId: "en",
            },
            {
                id: "4",
                display: "tags4",
                used: true,
                languageId: "en",
            },
        ],
        organization: {
            id: "2",
            display: "Dummy Organization 2",
            used: true,
            languageId: "en",
        },
        description: "This is a dummy description 2",
        languageId: "fr",
        uploader: "Dummy Uploader 2",
        id: "2",
    },
    {
        title: "Dummy Title 3",
        link: "https://dummylink3.com",
        tags: [
            {
                id: "5",
                display: "tags5",
                used: true,
                languageId: "en",
            },
            {
                id: "6",
                display: "tags6",
                used: true,
                languageId: "en",
            },
        ],
        organization: {
            id: "3",
            display: "Dummy Organization 3",
            used: true,
            languageId: "en",
        },
        description:
            "This is a dummy description 3 This is a dummy description 3 This is a dummy description 3 This is a dummy description 3 This is a dummy description 3 This is a dummy description 3 ",
        languageId: "es",
        uploader: "Dummy Uploader 3",
        id: "3",
    },
];

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
