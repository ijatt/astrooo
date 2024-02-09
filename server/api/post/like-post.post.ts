import prisma from "~/server/db/prisma"
import { PostData } from "~/types/post";

interface LikeRequest {
  user_id: number;
  post_id: number;
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<LikeRequest>(event)
    
    if (!body) return createError({ statusCode: 400, statusMessage: "Bad Request" })

    if (!prisma) return createError({ statusCode: 500, statusMessage: "Internal Server Error (Prisma)" })

    const isLiked = await prisma.likes.findFirst({
      where: {
        user_id: Number(body.user_id),
        post_id: Number(body.post_id)
      }
    })

    if (isLiked) {
      await prisma.likes.delete({
        where: {
          id: isLiked.id
        }
      })

      const post: PostData = await prisma.posts.findUniqueOrThrow({
        where: {
          id: Number(body.post_id)
        },
        include: {
          images: true,
          users: {
            select: {
              username: true,
              first_name: true,
              last_name: true,
              image_url: true,
            }
          },
          likes: true
        }
      })
      return post
    }

    await prisma.likes.create({
      data: {
        user_id: Number(body.user_id),
        post_id: Number(body.post_id)
      }
    })    

    const post: PostData = await prisma.posts.findUniqueOrThrow({
      where: {
        id: Number(body.post_id)
      },
      include: {
        images: true,
        users: {
          select: {
            username: true,
            first_name: true,
            last_name: true,
            image_url: true,
          }
        },
        likes: true
      }
    })
    return post
  } catch (error) {    
    return createError({ statusCode: 500, statusMessage: "Internal Server Error" })
  }
})
