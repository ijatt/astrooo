import prisma from "~/server/db/prisma";
import { Prisma } from "@prisma/client";

export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody<{ id: number }>(event);

    if (!prisma) return createError({ statusCode: 500, statusMessage: "Internal Server Error" });

    await prisma.posts.delete({
      where: {
        id: id,
      },
    });

    return { message: "Post deleted" };

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return createError({ statusCode: 500, statusMessage: error.message });
    }
    return createError({ statusCode: 500, statusMessage: "Internal Server Error" });
  }
})
