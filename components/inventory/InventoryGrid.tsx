"use client";

import { useInventoryContext } from "@/lib/context/inventory/InventoryContext";
import { InventoryCarousel } from "./InventoryCarousel";
import { InventoryDetails } from "./InventoryDetails";
import Link from "next/link";

export const InventoryGrid = () => {
	const { inventory } = useInventoryContext();

	return inventory.map((r) => {
		const detailsUrl = `/cars-for-sale/${encodeURIComponent(r.title || r.id?.toString())}`;
		return (
			<section key={r.id} className="lg:contents">
				<div className="bg-dark-100 outline-dark-200 outline-1 outline-offset-2">
					<InventoryCarousel
						data={r.inventoryImageMtm.map((m) => m.image)}
						title={r.title}
					/>
				</div>
				<div className="flex flex-col gap-4 px-4">
					<InventoryDetails url={detailsUrl} inventory={r} />
					<Link
						href={detailsUrl}
						className="mt-auto lg:mb-4 underline text-surface-700  "
					>
						Check Availability
					</Link>
				</div>
				<hr className="col-span-2" />
			</section>
		);
	});
};
