import {DataSource} from "typeorm";
import Note from "./enities/note";

const myDataSource = new DataSource({
    host: "localhost",
    type: "postgres",
    port: 5432,
    database: "ai_dojo_notes",
    username: "",
    password: "",
    entities: [
        Note,
    ],
    synchronize: true
})


export default myDataSource;