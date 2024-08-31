"use client";

import type { Provider } from "@/types";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export const SignInView = ({
	providers,
}: { providers: NonNullable<Provider[]> }) => {
	const icons = {
		Google: (color?: string) => <FaGoogle color={color || "white"} />,
		GitHub: (color?: string) => <FaGithub color={color || "white"} />,
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
								icons[provider.name as keyof typeof icons](
									provider.style.logo ||
										provider.style.brandColor ||
										provider.style.bg,
								)}
						</span>
						<span>Sign in with</span>
						<span>{provider.name}</span>
					</button>
				</li>
			))}
		</ul>
	);
};
