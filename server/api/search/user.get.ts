import prisma from "~/server/db/prisma"
import { Prisma } from "@prisma/client"

export default defineEventHandler(async (event) => {
  try {
    const { username } = getQuery(event)

    if (!username) {
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
              contains: username,
            }
          },
          {
            first_name: {
              contains: username,
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

    return users
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return createError({ statusCode: 500, statusMessage: error.message })
    }    
    return createError({ statusCode: 500, statusMessage: String(error) })
  }
})
