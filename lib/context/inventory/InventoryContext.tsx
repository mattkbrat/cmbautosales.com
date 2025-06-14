"use client";
import { type InvTitles, getTitles } from "@/lib/cars-for-sale";
import type { Inventory } from "@/types";
import { type ReactNode, createContext, useContext, useMemo } from "react";

export type InventoryContextType = {
	titles: InvTitles;
	inventory: Inventory;
};

const InventoryContext = createContext<InventoryContextType>({
	titles: [],
	inventory: [],
});

export const useInventoryContext = () => useContext(InventoryContext);

export const InventoryProvider = (p: {
	children: ReactNode;
	inventory: Inventory;
}) => {
	const titles = useMemo(() => getTitles(p.inventory), [p.inventory]);

	return (
		<InventoryContext.Provider
			value={{
				titles,
				inventory: p.inventory,
			}}
		>
			{p.children}
		</InventoryContext.Provider>
	);
};
