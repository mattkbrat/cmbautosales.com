import { formatCurrency } from "@/lib/format/currencyFormat";
import type { GroupedInventory } from "@/types";

export const InventoryDetails = ({
	inventory: { data },
}: { inventory: GroupedInventory }) => {
	return (
		<section className="flex flex-col gap-4">
			<section className="gap-2">
				<h2 id={data.title || undefined} className="text-xl font-semibold ">
					{data.title}
				</h2>
				<p className="text-gray-400 uppercase">
					{[data.drivetrain, data.model, data.body].filter(Boolean).join(" ")}
				</p>
			</section>
			<div className="flex flex-row gap-4">
				<section>
					<h3 className="text-sm">Price</h3>
					<p className="font-bold font-mono text-lg">
						<span>$</span>{" "}
						{data.price ? formatCurrency(data.price) : "Call for price"}
					</p>
				</section>
				<div className="border-l-gray-600/75 border-l-[2px] h-3/4 self-center" />
				<section>
					<h3 className="text-sm">Mileage</h3>
					<p className="font-bold font-mono text-lg">
						{data.mileage ? formatCurrency(data.mileage) : ""}
					</p>
				</section>
			</div>
		</section>
	);
};
