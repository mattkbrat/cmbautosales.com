"use client";
import { getTitles, type InvTitles } from "@/lib/cars-for-sale";
import type { Inventory } from "@/types";
import { createContext, useContext, useMemo, type ReactNode } from "react";
export type CamFilterParams = {
	f_name?: string;
	location?: string[];
	status?: string;
};

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
