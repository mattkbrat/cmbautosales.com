import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../database";
import { authConfig } from "./config";

export const {
	handlers: { GET, POST },
	auth,
} = NextAuth({
	session: { strategy: "jwt" },
	adapter: PrismaAdapter(prisma),
	...authConfig,
});

console.log("next auth", auth);
