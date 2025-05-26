"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { CiMenuBurger } from "react-icons/ci";
import { useHash } from "@/lib/hooks";

export const HeaderNav = () => {
	const pathname = usePathname();
	const { hash } = useHash();
	useEffect(() => {
		if (typeof document === "undefined") return;
		// Force dark mode
		window.localStorage.setItem("flowbite-theme-mode", "light");
	}, []);
	return (
		<>
			<nav className="items-end self-end sm:items-start sm:self-start z-10 sticky top-0">
				<ul className="hidden w-screen bg-surface lg:w-max h-fit lg:h-screen border-r-blue-600 border-0 lg:border-r-1 sm:flex lg:flex-col flex-row justify-center sm:sticky left-0 top-0 items-end uppercase lg:pl-4 text-xl gap-x-8">
					<li
						className={clsx("w-max py-3 px-4 flex-1 lg:flex-none text-center", {
							"border-blue-500 font-bold border-b-2 lg:border-b-0 lg:border-r-2":
								pathname === "/" && !hash,
						})}
					>
						<Link href="/#">Home</Link>
					</li>
					<li
						className={clsx("w-max py-3 px-4 flex-1 text-center lg:flex-none", {
							"border-blue-500 font-bold border-b-2 lg:border-b-0 lg:border-r-2":
								hash === "contact",
						})}
					>
						<Link href="/#contact">Contact</Link>
					</li>
					<li
						className={clsx("w-max py-3 px-4 flex-1 lg:flex-none text-center", {
							"border-blue-500 font-bold border-b-2 lg:border-b-0 lg:border-r-2":
								pathname === "/credit-application",
						})}
					>
						<Link href="/credit-application">Credit App</Link>
					</li>
				</ul>
			</nav>

			<Menu
				className={"text-right grid sm:hidden z-10 bg-surface"}
				menuClassName={"main-menu"}
				menuButton={
					<MenuButton
						className={
							"ml-auto mr-4 sm:hidden flex flex-row gap-2 items-end p-2"
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
					<Link href="/credit-application">Credit application</Link>
				</MenuItem>
			</Menu>
		</>
	);
};
