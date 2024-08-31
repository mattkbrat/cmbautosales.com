"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import NextImage from "next/image";

export const InventoryCarousel = ({
	data,
	title,
}: {
	data: { id: number; url: string }[];
	title: string | null;
}) => {
	return (
		<Carousel showThumbs={false} showStatus={true}>
			{data.map((r) => {
				return (
					<div key={r.id} className="flex items-center">
						<NextImage
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
