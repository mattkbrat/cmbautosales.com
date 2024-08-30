"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useContext, type ReactNode } from "react";

const context = createContext({});

export const useAuthContext = () => useContext(context);

export const AuthProvider = (p: {
	children: ReactNode;
}) => {
	return <SessionProvider>{p.children}</SessionProvider>;
};
