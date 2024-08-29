"use server";

import type { FormData } from "@/lib/context";
import { encrypt } from "@/lib/crypt";
import { prisma } from "@/lib/database";
import type { CreditApplication } from "@prisma/client";

export const submitCreditApp = async ({
	data,
	userId,
}: {
	data: FormData;
	userId: number;
}) => {
	const ssn = typeof data.SSN === "string" ? encrypt(data.SSN) : undefined;
	data.SSN = undefined;
	data.submitConfirm = undefined;
	const submitData = {
		...data,
		ssn,
		breadcrumbs: Array.isArray(data.breadcrumbs) ? data.breadcrumbs : undefined,
		housingOrRenting: data.housingOrRenting as string,
	} as Partial<CreditApplication>;

	return prisma.$transaction(async (tx) => {
		const app = await tx.creditApplication.upsert({
			where: {
				id: Number.isFinite(data.id) ? Number(data.id) : -1,
			},
			// @ts-ignore: this is fine.
			create: submitData,
			// @ts-ignore: this is fine.
			update: submitData,
		});

		const images = await tx.userImage.findMany({
			where: {
				creditApp: null,
				user: userId,
			},
		});

		await tx.userImage.updateMany({
			where: {
				id: {
					in: images.map((i) => i.id),
				},
			},
			data: {
				creditAppId: app.id,
			},
		});

		return app.id;
	});
};
