"use client";

import type { AuthProviders } from "@/types";
import { signIn } from "next-auth/react";

export const SignInView = ({
	providers,
}: { providers: NonNullable<AuthProviders> }) => {
	return (
		<>
			{Object.values(providers).map((provider) => (
				<div key={provider.name}>
					<button type="button" onClick={() => signIn(provider.id)}>
						Sign in with {provider.name}
					</button>
				</div>
			))}
		</>
	);
};
