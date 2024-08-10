"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { CiMenuBurger } from "react-icons/ci";
import { FaExternalLinkAlt } from "react-icons/fa";

export const HeaderNav = () => {
	const [hash, setHash] = useState("");
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// biome-ignore lint/correctness/useExhaustiveDependencies: We need to intercept the listener event for the hash change
	useEffect(() => {
		if (typeof window === "undefined") return;
		const currentHash = window.location.hash.replace("#", "");
		setHash(currentHash);
	}, [searchParams]);

	return (
		<nav className="items-end self-end sm:items-start sm:self-start z-10 sticky top-0">
			<ul className="hidden w-screen lg:w-max h-fit lg:h-screen bg-secondary-600 text-black sm:flex lg:flex-col flex-row justify-center sm:sticky left-0 top-0 items-end uppercase lg:pl-4 text-xl gap-x-8">
				<li
					className={clsx("w-max py-3 px-4 flex-1 lg:flex-none text-center", {
						"border-primary-50 font-bold border-b-2 lg:border-b-0 lg:border-r-2":
							pathname === "/" && !hash,
					})}
				>
					<Link href="/#">Home</Link>
				</li>
				<li
					className={clsx("w-max py-3 px-4 flex-1 text-center lg:flex-none", {
						"border-primary-50 font-bold border-b-2 lg:border-b-0 lg:border-r-2":
							hash === "contact",
					})}
				>
					<Link href="/#contact">Contact</Link>
				</li>
				<li
					className={clsx("w-max py-3 px-4 flex-1 text-center  lg:flex-none ")}
				>
					<a
						href="https://docs.google.com/forms/d/e/1FAIpQLSf3zQ7v5da7NYgnnPBfGzkIGbLJZdwnA5YbInfdDgm3zNWOYQ/viewform"
						target="_blank"
						rel="noreferrer"
						className="flex flex-row gap-x-2"
					>
						<span>Credit App</span>
						<FaExternalLinkAlt />
					</a>
				</li>
				<li
					className={clsx("w-max py-3 px-4 flex-1 lg:flex-none text-center", {
						"border-primary-50 font-bold border-b-2 lg:border-b-0 lg:border-r-2":
							pathname.includes("cars-for-sale"),
					})}
				>
					<Link href="/cars-for-sale">Cars for sale</Link>
				</li>
			</ul>
			<Menu
				className={"text-right bg-gray-900 flex sm:hidden z-10 items-end "}
				menuButton={
					<MenuButton
						className={
							"ml-auto mr-4 sm:hidden flex flex-row gap-2 items-end bg-dark-100 p-2"
						}
					>
						CMB Auto Sales <CiMenuBurger />
					</MenuButton>
				}
			>
				<MenuItem>
					<Link href="/#">Home</Link>
				</MenuItem>
				<MenuItem>
					<Link href="/#contact">Contact</Link>
				</MenuItem>
				<MenuItem className={"min-w-max"}>
					<Link href="/cars-for-sale">Cars for sale</Link>
				</MenuItem>
			</Menu>
		</nav>
	);
};
