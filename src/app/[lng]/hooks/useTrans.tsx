import { useState, useEffect } from "react";
import { useTranslation } from "@/i18n/client";
import { useParams } from "next/navigation";
import { LocaleTypes } from "@/i18n/settings";

function useTrans() {
    const [direction, setDirection] = useState<"ltr" | "rtl">("rtl");

    const locale = useParams()?.locale as LocaleTypes;
    const { t, i18n } = useTranslation(locale, "translation");

    useEffect(() => {
        setDirection(i18n.dir());
    }, [i18n.language]);

    const languageData = {
        direction,
        t,
        i18n,
    };

    return languageData;
}

export default useTrans;
