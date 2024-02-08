import { PostSchema } from "~/types/post"
import Post from "~/server/models/post"

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string }

    const post = await Post.findById(id)

    return post as unknown as PostSchema
  } catch (error) {
      return createError({ statusCode: 404, statusMessage: "Post not found." })     
  }
})
