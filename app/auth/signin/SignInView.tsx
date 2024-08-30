"use client";

import type { AuthProviders } from "@/types";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export const SignInView = ({
	providers,
}: { providers: NonNullable<AuthProviders> }) => {
	const icons = {
		Google: <FaGoogle />,
		GitHub: <FaGithub />,
	};

	return (
		<ul className="flex flex-col text-4xl self-center my-auto gap-4 bg-black/80 py-10 px-10 rounded-md">
			{Object.values(providers).map((provider) => (
				<li key={provider.name}>
					<button
						type="button"
						onClick={() => signIn(provider.id)}
						className="flex flex-row gap-x-2 "
					>
						<span>
							{provider.name in icons &&
								icons[provider.name as keyof typeof icons]}
						</span>
						<span>Sign in with</span>
						<span>{provider.name}</span>
					</button>
				</li>
			))}
		</ul>
	);
};
