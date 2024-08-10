import { getTitles, groupByInventory } from "@/lib/cars-for-sale";
import { InventoryProvider } from "@/lib/context/inventory/InventoryContext";
import { getInventory } from "@/lib/database";
import { TitlesNav } from "./TitlesNav";

const InvLayout = async ({ children }: { children: React.ReactNode }) => {
	const rows = await getInventory();

	return (
		<InventoryProvider inventory={rows}>
			<div className="md:mx-4 md:px-6  bg-dark-100/50 flex flex-row my-auto">
				<div className="flex-1 space-y-4">
					<h1 className="pt-2 underline underline-offset-2 flex flex-col">
						<span className="text-3xl">Cars For Sale</span>
					</h1>
					<span className="text-md">CMB Auto Sales</span>
					<div className="flex-1 gap-4 flex flex-col lg:flex-row pb-4">
						{children}
					</div>
				</div>
				<div className="relative bg-dark-100/25 px-2 hidden lg:block ">
					<TitlesNav />
				</div>
			</div>
		</InventoryProvider>
	);
};

export default InvLayout;
