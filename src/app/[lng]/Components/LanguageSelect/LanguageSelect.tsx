import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { DisplayLanguages } from "@/app/[lng]/general/interfaces";
import { styles } from "@/app/[lng]/Components/LanguageSelect/LanguageSelect.style";
import useTrans from "@/app/[lng]/hooks/useTrans";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSelect() {
    const { i18n } = useTrans();
    const router = useRouter();
    const pathname = usePathname();
    const changeLanguage = (e: SelectChangeEvent<string>) => {
        const newLang = e.target.value as string;
        i18n.changeLanguage(newLang);
        const pathNameArray = pathname.split("/");
        pathNameArray[1] = newLang;
        const newPathname = pathNameArray.join("/");
        router.replace(newPathname);
    };

    return (
        <Select
            onChange={changeLanguage}
            aria-label="change language"
            value={i18n.language || "he"}
            sx={styles.select}
        >
            {Object.keys(DisplayLanguages).map((lang) => (
                <MenuItem key={lang} value={lang}>
                    {DisplayLanguages[lang as keyof typeof DisplayLanguages]}
                </MenuItem>
            ))}
        </Select>
    );
}
