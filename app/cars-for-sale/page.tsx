// export const dynamic = "force-dynamic";

import { InventoryGrid, TitleMenu } from "@/lib/components/inventory";

export const metadata = {
	title: "Cars for Sale | CMB Auto Sales",
	description:
		"Current inventory list for CMB Auto Sales - located in Fort Morgan, Colorado",
};

const CarsForSale = async () => {
	return (
		<section className="flex flex-row relative min-h-screen ">
			<div className="grid content-start md:grid-cols-[repeat(1,_4fr_5fr)] gap-4 flex-1 ">
				<InventoryGrid />
			</div>
			<div
				id="titles-menu"
				className="fixed bottom-10 right-0 z-10 ml-auto xl:hidden"
			>
				<TitleMenu />
			</div>
		</section>
	);
};

export default CarsForSale;
