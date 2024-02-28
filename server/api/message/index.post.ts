import prisma from "~/server/db/prisma"
import { Prisma } from "@prisma/client"

interface Request {
  conversation_id: number
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<Request>(event)

    if (!body) return createError({ status: 400, message: "Invalid request" })

    const messages = await prisma.messages.findMany({
      where: {
        conversation_id: body.conversation_id
      },
      orderBy: {
        created_at: "asc"
      }
    })


    return messages
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return createError({ status: 400, message: error.message })
    }
    return createError({ status: 500, message: "Internal Server Error" })
  }
})
