import prisma from "~/server/db/prisma";
import { Prisma } from "@prisma/client";
import type {PostRequest, PostSchema} from "~/types/post";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<PostRequest | null>(event);
    if (body === null) {
      return createError({ statusCode: 400, statusMessage: "Bad Request" })
    }
      
    if (!prisma) {
      return createError({ statusCode: 500, statusMessage: "Internal Server Error" })
    }

    const post = await prisma.posts.create({
      data: {
        content: body.content,
        user_id: body.user_id
      }
    })

    
    if (body.image_url?.length) {
      body.image_url.forEach(async (img) => {
        // @ts-ignore
        await prisma.images.create({
          data: {
            image_url: img,
            post_id: post.id
          }
        })
      });
    }

    return post

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2000") {
        return createError({ statusCode: 400, statusMessage: "Content is too long" })
      }
    }
    return createError({ statusCode: 500, statusMessage: "Internal Server Error" })
  }
})
