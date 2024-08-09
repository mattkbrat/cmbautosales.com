"use client";

import type { InvTitles } from "@/lib/cars-for-sale";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";

export const TitleMenu = ({ titles }: { titles: InvTitles }) => {
	return (
		<Menu menuButton={<MenuButton>Open list</MenuButton>}>
			{titles.map((title) => (
				<MenuItem key={title}>
					<a className="text-right" href={`#${title}`}>
						{title}
					</a>
				</MenuItem>
			))}
		</Menu>
	);
};
