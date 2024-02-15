import prisma from "~/server/db/prisma"
import { Prisma } from "@prisma/client"

export default defineEventHandler(async (event) => {
  try {
    const { q } = getQuery<{ q: string }>(event)

    if (!q) {
      return createError({ statusCode: 400, statusMessage: "Bad Request" })
    }

    if (!prisma) {
      return createError({ statusCode: 500, statusMessage: "Internal Server Error" })
    }

    const users = await prisma.users.findMany({
      where: {
        OR: [
          {
            username: {
              contains: q,
            }
          },
          {
            first_name: {
              contains: q,
            }
          }
        ]
      },
      select: {
        id: true,
        username: true,
        first_name: true,
        last_name: true,
        image_url: true
      }
    })

    const posts = await prisma.posts.findMany({
      where: {
        content: {
          contains: q,
          mode: "insensitive"
        },
      },
      select: {
        id: true,
        content: true,
        created_at: true,
        users: {
          select: {
            username: true,
            first_name: true,
            last_name: true,
            image_url: true
          }
        },
        images: true,
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
    })

    return { users, posts }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return createError({ statusCode: 500, statusMessage: error.message })
    }    
    return createError({ statusCode: 500, statusMessage: String(error) })
  }
})
