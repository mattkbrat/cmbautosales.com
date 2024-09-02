"use server";

import { getServerSession } from "@/lib/auth";
import { FormErrors } from "@/lib/credit-application";
import { prisma } from "@/lib/database";
import { upload } from "@/lib/s3";
import type { User } from "@prisma/client";

const handleUpload = async ({
	image,
	userId,
	timestamp: now,
}: { image: File; userId: User["id"]; timestamp: number }) => {
	if (image.size > 24_000_000) {
		console.warn(
			`Can not upload image from ${userId}. Exceed max image size: ${image.size}`,
		);
		return {
			status: "error",
			message: FormErrors.maxSizeExceeded,
		};
	}

	const filename = `${userId}/${now}-${image.name}`;
	return upload({
		filename,
		file: await image.arrayBuffer().then((ab) => Buffer.from(ab)),
	}).then(async ({ bucket, r }) => {
		console.log("uploaded", r);
		await prisma.$transaction(async (tx) => {
			const dbImage = await tx.image.create({
				data: {
					url: filename,
					title: image.name,
					source: `r2/${bucket}`,
				},
			});

			await tx.userImage.create({
				data: {
					imageId: dbImage.id,
					user: userId,
				},
			});

			console.log("saved new image to db", { dbImage: dbImage.title, userId });
		});

		return {
			status: "success",
			message: image.name,
		};
	});
};

const checkAbuse = async ({
	userId,
	maxUploads = 5,
	inMinutes = 5,
	newUploads = 1,
}: {
	userId: User["id"];
	maxUploads?: number;
	inMinutes?: number;
	newUploads?: number;
}) => {
	const now = new Date();
	const fiveMinutesAgo = new Date(now).setMinutes(now.getMinutes() - inMinutes);

	const uploadsInTimerange = await prisma.userImage.count({
		where: {
			user: userId,
			uploaded: {
				gte: new Date(fiveMinutesAgo),
			},
		},
	});

	const threshold = maxUploads - newUploads;
	return uploadsInTimerange > threshold;
};

export const submitImage = async (formData: FormData) => {
	const image = formData.getAll("image") as unknown as File[];
	const timestamp = new Date().getTime();

	const session = await getServerSession();

	if (!session?.user?.email) {
		return {
			status: "error",
			message: FormErrors.unauthorized,
		};
	}

	const { email: userId } = session.user;
	const isAbuse = await checkAbuse({
		userId,
		newUploads: image.length,
		maxUploads: 6, // Allow for one replacement of all images
	});
	if (isAbuse) {
		console.warn("Abuse detected from user ", userId);
		return {
			status: "error",
			message: FormErrors.abuse,
		};
	}

	for await (const i of image) {
		console.log("Uploading image", i.name, userId);
		await handleUpload({ image: i, userId, timestamp });
	}

	return {
		status: "success",
	};
};
