export interface PostSchema {
    id: string;
    content: string;
    image_url?: Array<string>;
    user_id: number;
}

export interface PostRequest {
    content: string;
    image_url?: Array<string>;
    user_id: number;
}

export interface PostResponse {
    id: number;
    content: string;
    user_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface PostData {
    id: number;
    content: string;
    user_id: number;
    created_at: Date;
    updated_at: Date;
    images?: Image[];
    users: Users;
    likes?: Like[];
}

interface Image {
    id: number;
    image_url: string;
    post_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface Users {
    username: string;
    first_name: string;
    last_name: string;
    image_url: string | null;
}

export interface Like {
    id: number;
    user_id: number;
    post_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface Comment {
    id: number;
    content: string;
    user_id: number;
    post_id: number;
    created_at: Date;
    updated_at: Date;
    users: Users;
}

export interface Post {
    id: number;
    content: string;
    user_id: number;
    created_at: Date;
    updated_at: Date;
    images?: Image[];
    users: Users;
    likes?: Like[];
    comments?: Comment[];
}

export interface PostLikes {
    likes: []
}