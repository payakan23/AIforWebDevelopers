import express from "express";
import "reflect-metadata";
import database from "./database";
import User from "./entities/user";
import {attachControllers} from "@decorators/express";
import AuthController from "./controllers/authController";
import ConversationController from "./controllers/conversationController";

const app = express();
app.use(express.json())
const port = 3000;


const launch = async () => {

    await database.initialize();
    await attachControllers(app, [AuthController, ConversationController]);

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })

}

launch();