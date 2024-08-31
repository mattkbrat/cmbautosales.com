"use server";

import { getServerSession } from "@/lib/auth";
import type { FormData } from "@/lib/context";
import { FormErrors } from "@/lib/credit-application";
import { encrypt } from "@/lib/crypt";
import { prisma } from "@/lib/database";
import type { CreditApplication } from "@prisma/client";

export const submitCreditApp = async ({
	data,
}: {
	data: FormData;
}) => {
	const session = await getServerSession();

	if (!session?.user?.email) {
		return {
			status: "error",
			message: FormErrors.unauthorized,
		};
	}

	const { email: userId } = session.user;
	const ssn = typeof data.SSN === "string" ? encrypt(data.SSN) : undefined;
	const rentPayment =
		typeof data.rentPayment === "string"
			? Number(data.rentPayment)
			: Number.isFinite(data.rentPayment)
				? data.rentPayment
				: undefined;
	data.rentPayment = undefined;
	data.SSN = undefined;
	data.submitConfirm = undefined;
	const submitData = {
		...data,
		ssn,
		breadcrumbs: Array.isArray(data.breadcrumbs) ? data.breadcrumbs : undefined,
		housingOrRenting: data.housingOrRenting as string,
		email: userId,
		rentPayment,
	} as Partial<CreditApplication>;

	return prisma.$transaction(async (tx) => {
		const app = await tx.creditApplication.upsert({
			where: {
				id: Number.isFinite(data.id) ? Number(data.id) : 1,
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
