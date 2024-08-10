import { PrismaClient } from "@prisma/client";
import "server-only";

export * from "./auto-sales";

export const prisma = new PrismaClient();
