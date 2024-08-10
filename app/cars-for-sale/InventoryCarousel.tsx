"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import type { ArrayElement, Inventory } from "@/types";

export const InventoryCarousel = ({
	data,
	title,
}: {
	data: ArrayElement<NonNullable<Inventory>>["images"];
	title: string | null;
}) => {
	return (
		<Carousel showThumbs={false} showStatus={true}>
			{data.map((r) => {
				return (
					<div key={r.id} className="flex items-center">
						<Image
							src={r.url}
							width={400}
							height={100}
							id={title || undefined}
							alt={title || "Inventory image"}
							className="self-center"
						/>
						{/* <p className="legend">{title || business}</p> */}
					</div>
				);
			})}
		</Carousel>
	);
};
