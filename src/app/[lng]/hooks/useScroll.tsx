import { useEffect, useState } from "react";

export default function useScroll(
    openMenu: boolean,
    setOpenMenu: (value: boolean) => void,
    isMobile: boolean
) {
    const [scrollListenerAttached, setScrollListenerAttached] = useState(false);
    const windowEvent = typeof window !== "undefined" ? window.scrollY : null;
    useEffect(() => {
        if (openMenu) {
            setOpenMenu(false);
        }
    }, [windowEvent]);

    useEffect(() => {
        if (isMobile && openMenu) {
            if (!scrollListenerAttached && typeof window !== "undefined") {
                const handleScroll = () => {
                    setOpenMenu(false);
                    window.removeEventListener("scroll", handleScroll);
                    setScrollListenerAttached(false);
                };

                window.addEventListener("scroll", handleScroll);
                setScrollListenerAttached(true);
            }
        }
    }, [isMobile, openMenu, scrollListenerAttached]);
}
