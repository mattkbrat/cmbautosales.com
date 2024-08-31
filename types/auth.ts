import type { PromiseReturnType } from "@prisma/client/extension";
import type { getProviders } from "next-auth/react";

export type Provider = {
	id: string;
	name: string;
	type: string;
	style: {
		logo?: string;
		bg?: string;
		text?: string;
		brandColor?: string;
	};
};
export type AuthProviders = PromiseReturnType<typeof getProviders>;
