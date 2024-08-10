import { formatCurrency } from "@/lib/format/currencyFormat";
import type { Inventory } from "@/types";
import Link from "next/link";

export const InventoryDetails = ({
	inventory: data,
	url,
}: { inventory: Inventory[number]; url: string }) => {
	return (
		<section className="flex md:flex-col flex-row gap-4 items-center md:items-start">
			<section className="gap-2">
				<Link href={url}>
					<h2 className="text-xl lg:text-3xl font-semibold ">{data.title}</h2>
				</Link>
				<p className="text-gray-400 uppercase lg:text-xl">
					{[data.drivetrain, data.model, data.body].filter(Boolean).join(" ")}
				</p>
			</section>
			<div className="flex flex-row lg:flex-col gap-4 flex-wrap justify-around w-full">
				<section>
					<h3 className="text-sm lg:text-lg">Price</h3>
					<p className="font-bold font-mono text-lg min-w-max lg:text-xl">
						<span>$</span>{" "}
						{data.price ? formatCurrency(data.price) : "Call for price"}
					</p>
				</section>
				<div className="border-l-gray-600/75 border-l-[2px] h-3/4 self-center hidden sm:block lg:hidden " />
				<section>
					<h3 className="text-sm lg:text-lg">Mileage</h3>
					<p className="font-bold font-mono text-lg lg:text-xl">
						{data.mileage ? formatCurrency(data.mileage) : ""}
					</p>
				</section>
			</div>
		</section>
	);
};
