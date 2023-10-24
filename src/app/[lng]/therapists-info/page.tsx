"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import IncomingTherapists from "@/app/[lng]/Components/AdminComp/IncomingTherapists";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/app/[lng]/firebase/app";
import { AuthContext } from "@/app/[lng]/context/AuthContext";

export default function TherapistsInfoPage() {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/");
            }
        });
    }, [user]);
    return user ? <IncomingTherapists /> : null;
}
