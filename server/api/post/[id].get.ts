import prisma from "~/server/db/prisma"

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string }


    if (!prisma) return createError({ statusCode: 500, statusMessage: "Internal Server Error (Prisma)" })
    const post = await prisma.posts.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        comments: {
            include: {
                users: {
                    select: {
                        username: true,
                        first_name: true,
                        last_name: true,
                        image_url: true,
                    }
                }
            }
        },
        users: {
            select: {
                username: true,
                first_name: true,
                last_name: true,
                image_url: true,
            }
        },
        images: true,
        likes: true
    }
    })

    return post
   
  } catch (error) {
      return createError({ statusCode: 404, statusMessage: "Post not found." })     
  }
})
