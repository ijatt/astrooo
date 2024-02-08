import { PostSchema } from "~/types/post" 
import { PrismaClient } from "@prisma/client"

export default defineEventHandler(async (event) => {
  try {
    const prisma = new PrismaClient()
    const posts = await prisma.posts.findMany({
      include: {
        images: true,
        users: {
          select: {
            username: true,
            first_name: true,
            last_name: true,
          }
        }
      }
    })

    return posts

  } catch (error) {
    return createError({ statusCode: 500, statusMessage: "Internal Server Error" })
  }
})
