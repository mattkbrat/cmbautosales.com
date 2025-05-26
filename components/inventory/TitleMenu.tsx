"use client";

import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { CiMenuBurger } from "react-icons/ci";
import Link from "next/link";
import { useInventoryContext } from "@/lib/context";

export const TitleMenu = () => {
	const { titles } = useInventoryContext();
	return (
		<Menu
			className={"text-right grid z-10 items-end text-xl "}
			menuButton={
				<MenuButton
					className={
						"ml-auto mr-4  min-w-max flex flex-row gap-2 px-2 text-xl"
					}
				>
					Inv List <CiMenuBurger />
				</MenuButton>
			}
		>
			{titles.map((t) => (
				<MenuItem key={t} className={"min-w-max"}>
					<Link className="min-w-max break-words" href={`/cars-for-sale#${t}`}>
						{t}
					</Link>
				</MenuItem>
			))}
		</Menu>
	);
};
