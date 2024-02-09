import prisma from '~/server/db/prisma'
import { UserUpdateRequest } from '~/types/user'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<UserUpdateRequest>(event)

    if (!body) return createError({ statusCode: 400, statusMessage: 'Bad Request' })

    if (!prisma) return createError({ statusCode: 500, statusMessage: 'Internal Server Error' })

    const user = await prisma.users.update({
      where: {
        id: body.id
      },
      data: {
        first_name: body.first_name,
        last_name: body.last_name,
        username: body.username,
        image_url: body.image_url
      }
    })

    return body
  } catch (error) {
    return createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
  }
})
