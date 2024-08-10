import type { Inventory } from "../database";

export const getTitles = (rows: Inventory) =>
	rows.reduce((acc, r) => {
		if (!r.title) return acc;
		if (acc.includes(r.title)) return acc;
		acc.push(r.title);
		return acc;
	}, [] as string[]);

export type InvTitles = ReturnType<typeof getTitles>;
