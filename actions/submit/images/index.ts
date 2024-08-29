"use server";

import { prisma } from "@/lib/database";
import { upload } from "@/lib/s3";

const handleUpload = async ({
	image,
	userId,
}: { image: File; userId: number }) => {
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

		return image.name;
	});
};

export const submitImage = async (formData: FormData) => {
	const image = formData.getAll("image") as unknown as File[];
	const userId = Number(formData.get("userId") as string);

	const results = await Promise.allSettled(
		image.map((image) => {
			console.log("Uploading image", image.name, userId);
			return handleUpload({ image, userId });
		}),
	);

	console.log("submit results", results);

	return 0;
};
