import { z } from "zod";
import { createEnv } from "@t3-oss/env-core";

export const env = createEnv({
	server: {
		AWS_ACCESS_KEY_ID: z.string(),
		AWS_SECRET_ACCESS_KEY: z.string(),
		AWS_ENDPOINT: z.string(),
		CREDIT_APPLICATIONS_BUCKET: z.string(),
		CRYPT_SECRET: z.string().length(32),

		// Auth
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),
		NEXTAUTH_SECRET: z.string(),
	},
	client: {},
	/*
	 * Due to how Next.js bundles environment variables on Edge and Client,
	 * we need to manually destructure them to make sure all are included in bundle.
	 *
	 * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
	 */
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
		AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
		AWS_ENDPOINT: process.env.AWS_ENDPOINT,
		CREDIT_APPLICATIONS_BUCKET: process.env.CREDIT_APPLICATIONS_BUCKET,
		CRYPT_SECRET: process.env.CRYPT_SECRET,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
	},
	clientPrefix: "NEXT_PUBLIC_",
});
