"use client";

import { useInventoryContext } from "@/lib/context/inventory/InventoryContext";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export const TitlesNav = () => {
	const { titles } = useInventoryContext();
	const { invID } = useParams();

	console.log({ invID });
	return (
		<nav className="flex-col min:h-screen  overflow-y-auto min-w-max hidden lg:flex sticky  top-0 h-min">
			<h2 className="underline">Inventory List</h2>
			<ul className="list-disc  flex flex-col h-min">
				{titles.map((t) => {
					const href = invID ? `/cars-for-sale/${t}` : `#${t}`;
					return (
						<a key={t} className="min-w-max" href={href}>
							{t}
						</a>
					);
				})}
			</ul>
		</nav>
	);
};
