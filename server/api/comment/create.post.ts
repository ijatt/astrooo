import prisma from "~/server/db/prisma";

interface CommentRequest {
  content: string;
  post_id: number;
  user_id: number;
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<CommentRequest>(event);
    if (!body)
      return createError({ statusCode: 400, statusMessage: "Invalid request" });

    if (!prisma) throw new Error("Prisma Client is not available");

    await prisma.comments.create({
      data: {
        content: body.content,
        post_id: body.post_id,
        user_id: body.user_id,
      },
    });

    const post = await prisma.posts.findUniqueOrThrow({
      where: { id: body.post_id },
      select: {
        comments: {
          include: {
            users: {
              select: {
                username: true,
                first_name: true,
                last_name: true,
                image_url: true,
              },
            },
          },
          orderBy: {
            created_at: "desc",
          },
        },
      },
    });

    return post.comments;
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
