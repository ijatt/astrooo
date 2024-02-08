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

export interface PostData {
    id: number;
    content: string;
    user_id: number;
    created_at: Date;
    updated_at: Date;
    images?: Image[];
    users: Users;
}

interface Image {
    id: number;
    image_url: string;
    post_id: number;
    created_at: Date;
    updated_at: Date;
}

interface Users {
    username: string;
    first_name: string;
    last_name: string;
}