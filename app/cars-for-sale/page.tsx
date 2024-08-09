import { getInventory } from "@/lib/database/auto-sales";
import { InventoryCarousel } from "./InventoryCarousel";
import Link from "next/link";
import { getTitles, groupByInventory } from "@/lib/cars-for-sale";

// export const dynamic = "force-dynamic";

const CarsForSale = async () => {
	const rows = await getInventory();

	const groupedByInventory = groupByInventory(rows);
	const titles = getTitles(rows);

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
								<Link
									href={`/cars-for-sale/${encodeURIComponent(r.data.title || r.inventory.toString())}`}
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
