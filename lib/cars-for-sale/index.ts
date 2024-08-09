export type GroupedInventory = {
	inventory: Pick<InvHomeData[number], "image" | "url">[];
	data: Omit<InvHomeData[number], "image" | "url">;
};

export type InvHomeData = {
	inventory: number;
	image: number;
	title: null | string;
	business: string;
	url: string;
	id: number;
	price: number | null;
	transmission: null | string;
	drivetrain: null | string;
	mileage: null | string;
	make: null | string;
	model: null | string;
	body: null | string;
	year: null | string;
	sold: boolean;
	vin: null | string;
}[];

export const getTitles = (rows: InvHomeData) =>
	rows.reduce((acc, r) => {
		if (!r.title) return acc;
		if (acc.includes(r.title)) return acc;
		acc.push(r.title);
		return acc;
	}, [] as string[]);

export type InvTitles = ReturnType<typeof getTitles>;

export const groupByInventory = (rows: InvHomeData) =>
	rows.reduce(
		(acc, curr) => {
			const { image, url, ...rest } = curr;
			rest.title =
				rest.title ||
				[rest.year, rest.make, rest.model].filter(Boolean).join(" ").trim() ||
				rest.business;
			if (curr.inventory in acc) {
				acc[curr.inventory].inventory.push({ image, url });
			} else {
				acc[curr.inventory] = { inventory: [curr], data: rest };
			}

			return acc;
		},
		{} as {
			[key: string]: GroupedInventory;
		},
	);
