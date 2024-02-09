import prisma from "~/server/db/prisma"

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string }

    const post = await prisma.posts.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        images: true,
        users: {
          select: {
            username: true,
            first_name: true,
            last_name: true,
          }
        }
      }
    })

    return post
   
  } catch (error) {
      return createError({ statusCode: 404, statusMessage: "Post not found." })     
  }
})
