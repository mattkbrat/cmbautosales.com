import "server-only";
import { env } from "@/lib/env";
import type {
	GetServerSidePropsContext,
	NextApiRequest,
	NextApiResponse,
} from "next";
import { getServerSession, type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/database";
export const options = {
	// debug: true,
	// @ts-expect-error: It says the adapater is not compatible, which is false
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "database",
	},
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		}),
	],
	// callbacks: {
	// 	async jwt({ token, account }) {
	// 		// Persist the OAuth access_token to the token right after signin
	// 		if (account) {
	// 			token.accessToken = account.access_token;
	// 		}
	// 		return token;
	// 	},
	// 	async session({ session, token, user }) {
	// 		// Send properties to the client, like an access_token from a provider.
	// 		session.accessToken = token.accessToken;
	// 		return session;
	// 	},
	// },
} satisfies AuthOptions;

export function auth(
	...args:
		| [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
		| [NextApiRequest, NextApiResponse]
		| []
) {
	// @ts-expect-error: TODO: Debug why these types are broken.
	return getServerSession(...args, options);
}
