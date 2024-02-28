import prisma from '~/server/db/prisma'
import { Prisma } from '@prisma/client'

interface Request {
  user_id: number
}
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<Request>(event)
    if (!body) return createError({ status: 400, message: 'Invalid request' })

    const conversations = await prisma.conversations.findMany({
      where: {
        user: {
          some: {
            id: body.user_id
          }
        }
      },
      select: {
        user: {
          where: {
            NOT: {
              id: body.user_id
            }
          },
          select: {
            id: true,
            first_name: true,
            last_name: true,
            username: true,
            image_url: true
          }
        },
        messages: {
          orderBy: {
            created_at: 'desc'
          },
          take: 1
        }
      }
    })

    return conversations

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return createError({ status: 400, message: error.message })
    }
    return createError({ status: 500, message: 'Internal Server Error' })
  }
})
