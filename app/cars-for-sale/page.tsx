import { getInventory } from "@/lib/database/auto-sales";
import { InventoryCarousel } from "./InventoryCarousel";
import Link from "next/link";
import { getTitles, groupByInventory } from "@/lib/cars-for-sale";
import { InventoryDetails } from "./InventoryDetails";
import { TitleMenu } from "./TitleMenu";

// export const dynamic = "force-dynamic";

const CarsForSale = async () => {
	const rows = await getInventory();

	const groupedByInventory = groupByInventory(rows);
	const titles = getTitles(rows);

	console.log(groupedByInventory);
	return (
		<section className="flex  flex-row relative">
			<div className="grid grid-cols-[3fr_5fr] gap-4">
				<h1 className="col-span-full">Cars For Sale</h1>
				{/* <pre>{JSON.stringify(rows, null, 2)}</pre> */}
				{Object.entries(groupedByInventory).map(([k, r]) => {
					return (
						<div key={k} className="contents">
							<div className="overflow-hidden">
								<InventoryCarousel data={r.inventory} {...r.data} />
							</div>
							<div className="flex flex-col gap-4">
								<InventoryDetails inventory={r} />
								<Link
									href={`/cars-for-sale/${encodeURIComponent(r.data.title || r.inventory.toString())}`}
									className="mt-auto mb-4"
								>
									Check Availability
								</Link>
							</div>
						</div>
					);
				})}
			</div>
			<nav className="flex flex-col relative ">
				<div className="fixed top-0 right-0 flex flex-col ">
					<TitleMenu titles={titles} />
				</div>
			</nav>
		</section>
	);
};

export default CarsForSale;
