"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

export const AuthProvider = (p: {
	children: ReactNode;
}) => {
	return <SessionProvider>{p.children}</SessionProvider>;
};
