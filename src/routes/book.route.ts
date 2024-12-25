import express from 'express';
import { BookController } from "../controllers/book.controller";
import { addBookSchemaValidate, deleteBookSchemaValidate, getBookSchemaValidate, updateBookSchemaValidate } from '../models/book.schema';
import { IAddBookRequest, IUpdateBookRequest } from 'src/models/book.model';

export const bookRouter = express.Router();

bookRouter.post("/books", async (req: express.Request, res: express.Response) => await addBook(req, res));
bookRouter.get("/books", async (req: express.Request, res: express.Response) => await getBooks(req, res));
bookRouter.get("/book/:id", async (req: express.Request, res: express.Response) => await getBook(req, res));
bookRouter.put("/book/:id", async (req: express.Request, res: express.Response) => await updateBook(req, res));
bookRouter.delete("/book/:id", async (req: express.Request, res: express.Response) => await deleteBook(req, res));

export async function addBook(req: express.Request, res: express.Response) {
    const data: IAddBookRequest = req.body as IAddBookRequest;
    const { error, value } = addBookSchemaValidate.validate(data);
    if (error) {
        res.send(error?.message);
    } else {
        const response = await BookController().addBook(value, data.user_id);
        res.status(201).send(response);
    }
}

async function getBooks(req: express.Request, res: express.Response) {
    const response = await BookController().getBooks();
    res.status(201).send(response);
}

async function getBook(req: express.Request, res: express.Response) {
    const id: string = req.params?.id as string;
    const { error, value } = getBookSchemaValidate.validate(id);
    if (error) {
        res.send(error?.message);
    } else {
        const response = await BookController().getBook(id);
        res.status(201).send(response);
    }
}

async function updateBook(req: express.Request, res: express.Response) {
    const id: string = req.params?.id as string;
    const data: IUpdateBookRequest = req.body as IUpdateBookRequest;
    const { error, value } = updateBookSchemaValidate.validate(data);
    if (error) {
        res.send(error?.message);
    } else {
        const response = await BookController().updateBook(id, data, data.user_id);
        res.status(201).send(response);
    }
}

async function deleteBook(req: express.Request, res: express.Response) {
    const id: string = req.params?.id as string;
    const { error, value } = deleteBookSchemaValidate.validate(id);
    if (error) {
        res.send(error?.message);
    } else {
        const response = await BookController().deleteBook(id);
        res.status(201).send(response);
    }
}