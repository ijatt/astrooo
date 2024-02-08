import mongoose from "mongoose";
import type { PostSchema } from "~/types/post";

const PostSchema = new mongoose.Schema<PostSchema>({
    content: {
        type: String,
        required: [true, "Content is required"]
    },
    image_url: {
        type: [String],
    },
    user_id: {
        type: String,
        required: [true, "User ID is required"]
    }
})

export default mongoose.model<PostSchema>("Post", PostSchema)