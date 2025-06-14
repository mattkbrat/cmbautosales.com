"use client";
import type { DefaultSession } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { GoSignOut } from "react-icons/go";
export const UserBar = ({
	user,
	intro = "Hello,",
}: { intro?: string; user: NonNullable<DefaultSession["user"]> }) => {
	return (
		<div className="flex flex-wrap-reverse flex-1">
			<div className="grid justify-between items-start">
				<div className="grid flex-1">
					<span className="text-sm">{intro}</span>
					<div className="grid">
						<span className="text-2xl">{user.name}</span>
						<span className="text-sm min-w-max">{user.email || ""}</span>
					</div>
				</div>
				<div className="mt-auto">
					<button
						type="button"
						className="flex gap-2 underline "
						onClick={() => {
							signOut();
						}}
					>
						<span>Not you?</span>
						<GoSignOut />
					</button>
				</div>
			</div>
			<div className="grid"></div>
			{user.image ? (
				<Image
					src={user.image}
					height={400}
					width={400}
					alt="user profile image"
					className="row-span-2 h-auto md:h-full md:w-auto md:ml-auto mr-4 self-center"
				/>
			) : (
				<span />
			)}
		</div>
	);
};
