"use client";

import type { GroupedInventory, InvHomeData } from "./page";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

export const InventoryCarousel = ({
	data,
	title,
	business,
	inventory,
}: {
	data: GroupedInventory["inventory"];
	title: string | null;
	business: string;
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
