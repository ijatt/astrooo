import prisma from "../../db/prisma"
import { Prisma } from "@prisma/client"

interface Request {
  user1_id: number
  user2_id: number
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<Request>(event)

    if (!body) return createError({ status: 400, message: "Invalid request" })

    const conversation = await prisma.conversations.findFirst({
      where: {
        AND: [
          { user: { some: { id: body.user1_id } } },
          { user: { some: { id: body.user2_id } } }
        ]
      }
    })

    return conversation
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return createError({ status: 400, message: error.message })
    }
    return createError({ status: 500, message: "Internal Server Error" })
  }
})
