import mongoose from "mongoose";
import { UserSchema } from "~/types/user";

const userSchema = new mongoose.Schema<UserSchema>({
    email: {
        type: String,
        required: [true, "Email is required"],
        index: {
            unique: true
        },
        validate: {
            validator: (v: string) => {
                return /^\S+@\S+\.\S+$/.test(v)
            },
            message: 'Email is not valid'
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
        minlength: [8, "Password must be at least 8 characters long"]
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        index: {
            unique: true
        }
    },
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
        validate: {
            validator: (v: string) => {
                return /^[a-zA-Z\s-]+$/.test(v)
            },
            message: 'First name is not valid'
        }
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
        validate: {
            validator: (v: string) => {
                return /^[a-zA-Z\s-]+$/.test(v)
            },
            message: 'Last name is not valid'
        }
    },
    image_url: {
        type: String,
    },
    updatedAt: {
        type: Date,
    }
}, {timestamps: true});

export default mongoose.model<UserSchema>("User", userSchema)