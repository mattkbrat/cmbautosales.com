"use server";

import { FormErrors } from "@/lib/credit-application";
import { prisma } from "@/lib/database";
import { upload } from "@/lib/s3";

const handleUpload = async ({
	image,
	userId,
}: { image: File; userId: number }) => {
	if (image.size > 24_000_000) {
		return {
			status: "error",
			message: FormErrors.maxSizeExceeded,
		};
	}

	const now = new Date().getTime();
	const filename = `${userId}/${now}-${image.name}`;
	return upload({
		filename,
		file: await image.arrayBuffer().then((ab) => Buffer.from(ab)),
	}).then(async ({ bucket, r }) => {
		console.log("uploaded", r);
		await prisma.$transaction(async (tx) => {
			const dbImage = await tx.image.upsert({
				where: {
					url: filename,
				},
				create: {
					url: filename,
					title: image.name,
					source: `r2/${bucket}`,
				},
				update: {
					title: image.name,
					source: `r2/${bucket}`,
				},
			});

			await tx.userImage.upsert({
				where: {
					user_imageId: {
						imageId: dbImage.id,
						user: userId,
					},
				},
				create: {
					imageId: dbImage.id,
					user: userId,
				},
				update: {},
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
	userId: number;
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
	const userId = Number(formData.get("userId") as string);

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

	const results = await Promise.allSettled(
		image.map((image) => {
			console.log("Uploading image", image.name, userId);
			return handleUpload({ image, userId });
		}),
	);

	console.log("submit results", results, { userId });

	return {
		status: "success",
	};
};
