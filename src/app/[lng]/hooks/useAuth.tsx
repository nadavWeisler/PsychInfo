import { useState, useEffect, useContext } from "react";
import { User, onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/app/[lng]/firebase/app";
import { AuthContext } from "@/app/[lng]/context/AuthContext";

export default function useAuth() {
    const [authUser, setAuthUser] = useState<User | null>(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setAuthUser(user);
        });
    }, [user]);

    return { authUser };
}
