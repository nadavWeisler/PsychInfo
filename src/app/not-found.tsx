"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Custom404 = () => {
    const router = useRouter();

    useEffect(() => {
        // Add your redirection logic here
        // For example, redirect to the home page:
        router.push("/he");
    }, []);

    return (
        <div>
            <h1>Page Not Found</h1>
            {/* You can add a message or content for the not-found page */}
        </div>
    );
};

export default Custom404;
