import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { routes } from "./routes/routes";
import { connection } from "./db_connection";

const app = express();

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

app.use('/', routes);
const port = process.env.PORT;

app.set("port", port);

app.get("/ping", (req: Request, res: Response) => {
    res.status(200).send("Ping check success");
});

connection.then(() => {
    app.listen(port, () => {
        console.log("Server is listening on port ", port);
        console.log("http://localhost:%d/ping", app.get("port"));
    });
});