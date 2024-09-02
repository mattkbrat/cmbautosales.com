import type { User } from "next-auth";
import { prisma } from "../database";

export const checkUserExists = async (user: NonNullable<User>) => {
	if (!user.email || !user.name) {
		console.error("Invalid user", user);
		return false;
	}
	return prisma.user.upsert({
		where: {
			email: user.email,
		},
		create: {
			image: user.image,
			email: user.email,
			name: user.name,
		},
		update: {
			email: user.email,
			name: user.name,
		},
	});
};
