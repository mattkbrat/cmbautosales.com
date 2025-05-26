"use client";

import type { Provider } from "@/types";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export const SignInView = ({
	providers,
	callback,
}: { providers: NonNullable<Provider[]>; callback?: string }) => {
	const handleSignIn = (providerId: string) => {
		signIn(providerId, { callbackUrl: callback });
	};

	return (
		<ul className="flex flex-col text-4xl items-center my-auto gap-4 py-10 rounded-md lg:mx-[10dvw] bg-surface">
			<div className="uppercase text-center">
				<span className="">
					<span>Sign In</span>
					<span>&nbsp;</span>
					<span className="lg:hidden">With</span>
				</span>
			</div>
			<hr className="w-3/4 lg:w-1/2" />
			{Object.values(providers).map((provider) => (
				<li
					key={provider.name}
					className="rounded-lg"
					style={{
						border: `2px solid ${provider.style.bg ?? provider.style.brandColor}`,
					}}
				>
					<button
						type="button"
						onClick={() => handleSignIn(provider.id)}
						className="flex-1 py-4 px-10 flex gap-x-2 rounded-md shadow-sm justify-between cursor-pointer"
					>
						{provider.name === "Google" ? (
							<FaGoogle />
						) : (
							provider.name === "GitHub" && (
								<FaGithub color={provider.style.logo} />
							)
						)}
						<span>
							<span className="hidden lg:inline-block">Sign In With</span>
							<span>&nbsp;</span>
							<span>{provider.name}</span>
						</span>
					</button>
				</li>
			))}
			<hr className=" w-3/4 lg:w-1/2" />
			<span className="text-xs">
				Will return to {callback} after signing in
			</span>
		</ul>
	);
};
