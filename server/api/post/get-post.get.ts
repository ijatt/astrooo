import prisma from "~/server/db/prisma"

export default defineEventHandler(async (event) => {
  try {
    if (!prisma) {
      return createError({ statusCode: 500, statusMessage: "Internal Server Error" })
    }

    const posts = await prisma.posts.findMany({
      include: {
        images: true,
        users: {
          select: {
            username: true,
            first_name: true,
            last_name: true,
            image_url: true
          }
        }
      },
      orderBy: {
        created_at: "desc"
      }
    })

    return posts

  } catch (error) {
    return createError({ statusCode: 500, statusMessage: "Internal Server Error" })
  }
})
