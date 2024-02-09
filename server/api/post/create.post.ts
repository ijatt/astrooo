import prisma from "~/server/db/prisma";
import type {PostRequest, PostSchema} from "~/types/post";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<PostRequest | null>(event);
    if (body === null) {
      return createError({ statusCode: 400, statusMessage: "Bad Request" })
    }
        
    const post = await prisma.posts.create({
      data: {
        content: body.content,
        user_id: body.user_id
      }
    })

    if (body.image_url?.length) {
      body.image_url.forEach(async (img) => {
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
    return createError({ statusCode: 500, statusMessage: "Internal Server Error" })
  }
})
