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