import { UserData } from "~/types/user"
import prisma from "~/server/db/prisma"

export default defineEventHandler(async (event) => {
  try {
    const userID = await checkAccessToken(event)
    
    if(!userID) return createError({ statusCode: 401, statusMessage: "Unauthorized" })

    if (!prisma) {
      return createError({ statusCode: 500, statusMessage: "Internal Server Error" })
    }

    const user = await prisma.users.findUnique({
      where: {
        id: userID as number
      },
      select: {
        id: true,
        email: true,
        username: true,
        first_name: true,
        last_name: true,
        image_url: true
      }
    })
    if(!user) return createError({ statusCode: 404, statusMessage: "User not found" })

    return user as unknown as UserData
  } catch (error) {
    return createError({ statusCode: 500, statusMessage: "Internal Server Error" })
  }
})
