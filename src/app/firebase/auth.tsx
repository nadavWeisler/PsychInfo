import { auth, db } from "@/app/firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";

export const runtime = "edge";

export const signIn = async (email: string, password: string) => {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
        error = err;
    }

    return { result, error };
};
