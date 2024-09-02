"use client";

import type { Provider } from "@/types";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export const SignInView = ({
	providers,
}: { providers: NonNullable<Provider[]> }) => {
	return (
		<ul className="flex flex-col text-4xl items-center my-auto gap-4 bg-black/80 py-10 rounded-md lg:mx-[10dvw]">
			<div className="uppercase">
				<span className="">
					<span>Sign In</span>
					<span>&nbsp;</span>
					<span className="lg:hidden">With</span>
				</span>
			</div>
			<hr className="text-white w-3/4 lg:w-1/2" />
			{Object.values(providers).map((provider) => (
				<li
					key={provider.name}
					className=""
					style={{
						backgroundColor: provider.style.bg || provider.style.brandColor,
					}}
				>
					<button
						type="button"
						onClick={() => signIn(provider.id)}
						className="flex-1 py-4 px-10 flex gap-x-2 rounded-md shadow-sm justify-between"
					>
						{provider.name === "Google" ? (
							<FaGoogle />
						) : (
							provider.name === "GitHub" && <FaGithub />
						)}
						<span>
							<span className="hidden lg:inline-block">Sign In With</span>
							<span>&nbsp;</span>
							<span>{provider.name}</span>
						</span>
					</button>
				</li>
			))}
		</ul>
	);
};
