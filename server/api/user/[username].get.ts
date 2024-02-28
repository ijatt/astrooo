import prisma from "~/server/db/prisma"
import { Prisma } from "@prisma/client"

export default defineEventHandler(async (event) => {
  try {
    const { username } = event.context.params as { username: string }
    
    if (!prisma) {
      return createError({ statusCode: 500, statusMessage: "Internal Server Error" })
    }

    const user = await prisma.users.findUniqueOrThrow({
      where: {
        username: username
      },
      select: {
        id: true,
        username: true,
        first_name: true,
        last_name: true,
        image_url: true,
        created_at: true,
        posts: {
          include: {
            images: true,
            users: {
              select: {
                username: true,
                first_name: true,
                last_name: true,
                image_url: true
              }
            },
            likes: true,
            comments: {
              include: {
                users: {
                  select: {
                    username: true,
                    first_name: true,
                    last_name: true,
                    image_url: true
                  }
                }
              }
            }
          },
          orderBy: {
            created_at: "desc"
          }
        },
        followedBy: true,
        following: true
      }
    })

    return user
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return createError({ statusCode: Number(error.code), statusMessage: error.message })
    }
    return createError({ statusCode: 404, statusMessage: error.message   })
  }
})
