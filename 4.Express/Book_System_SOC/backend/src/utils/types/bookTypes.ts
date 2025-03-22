import { UserRequest } from "./userTypes";

//book type defining the structure of an event record in postgresql
export interface Book{
    book_id: number;
    title: string;
    author: string;
    genre: string;
    year: number;
    publisher: string;
    description: string;
    image_url: string;
    price: number;
    created_by: number; //FK referencing user_id in users table
    created_at?: Date;
    updated_at?: Date;
}

export interface BookRequest extends UserRequest{
    params: {
        id: string;
    }
    book?: Book;
}