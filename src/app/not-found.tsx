"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Custom404 = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace("/he/home-page");
    }, []);

    return (
        <div>
            <h1>Page Not Found</h1>
        </div>
    );
};

export default Custom404;
