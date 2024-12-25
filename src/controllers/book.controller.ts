import { IAddBookRequest, IBookSchema } from "src/models/book.model";
import { Book } from "../models/book.schema";

export function BookController() {

    async function addBook(data: IAddBookRequest, created_by?: string) {
        try {
            const newBook: IBookSchema = await Book.create({ ...data, created_by: created_by });
            console.log({ newBook });
            return {
                status: "Success",
                data: newBook
            };
        } catch (error) {
            return {
                status: "Failed",
                message: error
            };
        }
    }

    async function getBooks() {
        try {
            const books: IBookSchema[] = await Book.find({});
            return books;
        }
        catch (error) {
            return {
                status: "Failed",
                message: error
            };
        }
    }

    async function getBook(id: string) {
        try {
            const book: IBookSchema | null = await Book.findById({ "_id": id });

            if (!book) {
                return {
                    status: "Failed",
                    message: "Book not available"
                };
            }
            return {
                status: "Success",
                data: book
            };
        }
        catch (error) {
            return {
                status: "Failed",
                data: error
            };
        }
    }

    async function updateBook(id: string, data: IAddBookRequest, updated_by?: string) {
        try {
            const book: IBookSchema | null = await Book.findByIdAndUpdate({ "_id": id }, { ...data, updated_by: updated_by }, { new: true });

            if (!book) {
                return {
                    status: "Failed",
                    message: "Book not available"
                };
            }
            return {
                status: "Success",
                data: book
            };
        }
        catch (error) {
            return {
                status: "Failed",
                data: error
            };
        }
    }

    async function deleteBook(id: string) {
        try {
            const book: IBookSchema | null = await Book.findByIdAndDelete({ "_id": id });
            if (!book) {
                return {
                    status: "Failed",
                    message: "Book not available"
                };
            } else {
                return {
                    status: "Success",
                    message: book
                };
            }
        } catch (error) {
            return {
                status: "Failed",
                message: error
            };
        }
    }

    return { addBook, getBooks, getBook, updateBook, deleteBook };
}
