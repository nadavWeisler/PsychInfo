"use client";
import React, { useEffect, useState, createContext, ReactElement } from "react";
import { auth } from "@/app/[lng]/firebase/app";
import { User, onAuthStateChanged } from "@firebase/auth";
import {
  ContextProps,
  AuthProviderProps,
} from "@/app/[lng]/general/interfaces";

export const AuthContext = createContext<ContextProps>({ user: undefined });

export default function AuthProvider({
  children,
}: AuthProviderProps): ReactElement {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
