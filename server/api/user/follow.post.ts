import prisma from "~/server/db/prisma"
import { Prisma } from "@prisma/client"

interface FollowRequest {
  following_id: number
  follower_id: number
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<FollowRequest>(event)

    if (!body) return createError({ statusCode: 400, statusMessage: "Bad Request" })

    const isFollowing = await prisma.follows.findFirst({
      where: {
        followingId: Number(body.following_id),
        followedById: Number(body.follower_id)
      }
    })

    if (isFollowing) {
      await prisma.follows.delete({
        where: {
          followingId_followedById: {
            followingId: Number(body.following_id),
            followedById: Number(body.follower_id)
          }
        }
      })

      return { following: false }
    }

    const follows = await prisma.follows.create({
      data: {
        followedById: Number(body.follower_id),
        followingId: Number(body.following_id)
      }
    })

    return follows
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return createError({ statusCode: 500, statusMessage: error.message })
    }
    return createError({ statusCode: 500, statusMessage: String(error) })
  }
})
