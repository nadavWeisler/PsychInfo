import { useState, useEffect, useContext } from "react";
import { User, onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/app/[lng]/firebase/app";
import { AuthContext } from "@/app/[lng]/context/AuthContext";
import { useRouter } from "next/navigation";

export default function useAuth(isProtected: boolean = false) {
    const [authUser, setAuthUser] = useState<User | null>(null);
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setAuthUser(user);
            if (isProtected && !user) {
                router.push("/");
            }
        });
    }, [user]);

    return { authUser };
}
