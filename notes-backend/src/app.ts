import express from "express";
import {attachControllers} from "@decorators/express";
import NotesController from "./controllers/notesController";
const app = express();
const port = 3000;
import database from "./database";
import cors from "cors";
app.use(cors());
app.use(express.json());
database.initialize().then(dataSource => {
    console.log(`The db is connected`);
}).catch(error => {
    console.log(error);
});

app.listen(port, () => {
    console.log(`This server is running.....`);
})

attachControllers(app,[NotesController]).then(res => {
    console.log("The controllers has been attached");
})


// npm install typescript -g
// tsc --init or npx tsc --init -> Will generate tsconfig.json
// npm install @types/express;