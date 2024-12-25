import express from "express";
import { bookRouter } from "./book.route";

export const routes = express.Router();

routes.use(bookRouter);