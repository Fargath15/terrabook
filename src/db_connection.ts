import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const dbHost: string = process.env.DB_HOST || "";
const dbName: string = process.env.DB_NAME || "";
const dbPass: string = process.env.DB_PASS || "";

export const connection = mongoose.connect((`mongodb+srv://${dbName}:${dbPass}@${dbHost}/?retryWrites=true&w=majority&appName=Cluster0`))
    .then(res => {
        if (res) {
            console.log(`Database connection succeffully to ${dbName}`);
        }
    }).catch(err => {
        console.log(err);
        process.exit(0);
    });
