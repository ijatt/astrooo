import Prisma from "@prisma/client";
const { PrismaClient } = Prisma;

declare global {
    // @ts-ignore
    var prisma: PrismaClient | undefined;
}

// @ts-ignore
let prisma: PrismaClient | null = null;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;