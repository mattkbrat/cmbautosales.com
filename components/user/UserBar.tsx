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
		<>
			<div className="flex flex-col md:flex-row flex-wrap">
				<div className="grid flex-1">
					<span className="text-sm">{intro}</span>
					<div className="grid ">
						<span className="text-2xl">{user.name}</span>
						<span className="text-sm md:-mt-2">{user.email || ""}</span>
					</div>
				</div>
				{user.image ? (
					<Image
						src={user.image}
						height={40}
						width={40}
						alt="user profile image"
						className="row-span-2 h-auto w-full md:h-full md:w-auto md:min-h-24 md:ml-auto mr-4 self-center"
					/>
				) : (
					<span />
				)}
			</div>
			<hr className="" />
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
		</>
	);
};
