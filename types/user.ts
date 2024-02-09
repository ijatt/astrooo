import type { PostData } from "./post"; 

export interface UserSchema {
    _id: string;
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    updatedAt: Date;
    image_url: string | null;
}

export interface UserRequest {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
}

export interface UserSignInRequest {
    email: string;
    password: string;
}

export interface UserData {
    id: number;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
    image_url: string | null;
}

export interface UserProfile {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    image_url: string;
    posts: PostData[]
    created_at: Date;
}


export interface UserUpdateRequest {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    image_url: string;
}