import {DataSource} from "typeorm";
import User from "./entities/user";
import Conversation from "./entities/conversation";
import Message from "./entities/message";

const source = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    database: "chat_full",
    username: "",
    password: "",
    entities: [
        User,
        Conversation,
        Message
    ],
    synchronize: true
})

export default source;