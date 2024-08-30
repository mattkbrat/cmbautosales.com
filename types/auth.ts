import type { PromiseReturnType } from "@prisma/client/extension";
import type { getProviders } from "next-auth/react";

export type AuthProviders = PromiseReturnType<typeof getProviders>;
