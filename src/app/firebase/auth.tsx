import { auth } from "@/app/firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";

export const runtime = "edge";

export const signIn = async (email: string, password: string) => {
    let result;
    let error;
    
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
        error = err;
    }

    return { result, error };
};
