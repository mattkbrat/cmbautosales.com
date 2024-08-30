import { options } from "@/lib/auth";
import NextAuth from "next-auth";

// @ts-expect-error: TODO: Debug types
const handler = NextAuth(options);

export { handler as GET, handler as POST };
