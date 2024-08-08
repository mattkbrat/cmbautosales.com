import { sql } from "@vercel/postgres";
import { InventoryCarousel } from "./InventoryCarousel";
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
import Link from "next/link";
export const dynamic = "force-dynamic";
const getInventory = async (business: string): Promise<InvHomeData> => {
	return sql`
select i.id as inventory, i.business, im.id as image, i.title, i.*, i.business, im.url
from inventory i
         join image im on i.id = im.inventory
where (i.business = 'cmb' or i.business = 'CMB AUTO SALES')
--   not i.hidden
order by i.title ASC, im.order ASC
`.then((res) => res.rows as InvHomeData);
};

export type GroupedInventory = {
	inventory: Pick<InvHomeData[number], "image" | "url">[];
	data: Omit<InvHomeData[number], "image" | "url">;
};
const CarsForSale = async () => {
	const rows = await getInventory("cmb");

	const titles = rows.reduce((acc, r) => {
		if (!r.title) return acc;
		if (acc.includes(r.title)) return acc;
		acc.push(r.title);
		return acc;
	}, [] as string[]);
	const groupedByInventory = rows.reduce(
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

	console.log(groupedByInventory);
	return (
		<section className="flex flex-wrap flex-row relative">
			<div className="flex flex-col">
				<h1>Cars For Sale</h1>
				{/* <pre>{JSON.stringify(rows, null, 2)}</pre> */}
				{Object.entries(groupedByInventory).map(([k, r]) => {
					return (
						<div key={k} className="grid grid-cols-[3fr_5fr] gap-4">
							<div className="overflow-hidden">
								<InventoryCarousel data={r.inventory} {...r.data} />
							</div>
							<div className="flex flex-col gap-4">
								<h2 id={r.data.title || undefined}>{r.data.title}</h2>
								<details>
									<summary>Expand details</summary>
									<table className="table ">
										<tbody className="uppercase border-spacing-4 ">
											{Object.entries(r.data)
												.filter((r) => !!r[1])
												.map(([k, v]) => {
													return (
														<tr key={k} className="odd:bg-surface-950/75">
															<td className="uppercase text-secondary-200/75 font-semibold">
																{k}
															</td>
															<td>{v}</td>
														</tr>
													);
												})}
										</tbody>
									</table>
								</details>
								<Link
									href={`/cars-for-sale/${encodeURI(r.data.title || r.inventory.toString())}`}
								>
									Check Availability
								</Link>
							</div>
						</div>
					);
				})}
			</div>
			<nav className="flex fixed flex-col top-0 right-4">
				<h2 className="uppercase underline underline-offset-2 text-primary-200/75 font-bold tracking-wide">
					Inv List
				</h2>
				<ul>
					{titles.map((title) => {
						return (
							<a href={`#${title}`} key={title}>
								<li>{title}</li>
							</a>
						);
					})}
				</ul>
			</nav>
		</section>
	);
};

export default CarsForSale;
