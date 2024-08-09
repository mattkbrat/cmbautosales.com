"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import type { GroupedInventory } from "@/types";

export const InventoryCarousel = ({
	data,
	title,
	inventory,
}: {
	data: GroupedInventory["inventory"];
	title: string | null;
	inventory: number;
}) => {
	return (
		<Carousel showThumbs={false} showStatus={true}>
			{data.map((r) => {
				return (
					<div key={inventory}>
						<Image
							src={r.url}
							width={400}
							height={100}
							// className="object-center aspect-square object-cover "
							alt={title || "Inventory image"}
						/>
						{/* <p className="legend">{title || business}</p> */}
					</div>
				);
			})}
		</Carousel>
	);
};
