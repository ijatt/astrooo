import prisma from "../../db/prisma"

interface Message {
  content: string
  user_id: number
  conversation_id: number
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<Message>(event)

    const message = await prisma.messages.create({
      data: {
        content: body.content,
        user_id: body.user_id,
        conversation_id: body.conversation_id
      }
    })

    return message
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      body: { error: "Internal Server Error" }
    }
  }
})
