import { withOptimize } from "@prisma/extension-optimize";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient().$extends(
	withOptimize({ apiKey: process.env.OPTIMIZE_API_KEY as string }),
);

export default prisma;
