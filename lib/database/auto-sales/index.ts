import "server-only";

import { prisma } from "..";
import type { Prisma } from "@prisma/client";

const isNum = (id: string | number) => !Number.isNaN(Number(id));

export const getInventory = async () => {
	return prisma.inventory.findMany({
		select: {
			id: true,
			title: true,
			year: true,
			make: true,
			model: true,
			price: true,
			mileage: true,
			body: true,
			drivetrain: true,
			images: { select: { id: true, url: true } },
		},
		where: {
			hidden: false,
		},
	});
};

export const getIndividualInventory = async (id: string | number) => {
	return prisma.inventory.findFirst({
		where: isNum(id)
			? { id: Number(id) }
			: { title: decodeURIComponent(id.toString()) },
		include: { images: true },
	});
};
export const getIndividualInventoryTitle = async (
	id: string,
): Promise<string | null> => {
	if (!isNum(id)) return decodeURIComponent(id);
	return prisma.inventory
		.findUnique({
			where: { id: Number(id) },
			select: { title: true },
		})
		.then((r) => r?.title || null);
};

export type Inventory = Prisma.PromiseReturnType<typeof getInventory>;
export type InventoryDetails = Prisma.PromiseReturnType<
	typeof getIndividualInventory
>;
