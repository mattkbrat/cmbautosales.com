import { authConfig } from "@/lib/auth/config";
import NextAuth from "next-auth";

export const {
	handlers: { GET, POST },
} = NextAuth({
	session: { strategy: "jwt" },
	...authConfig,
});
export const runtime = "edge";
