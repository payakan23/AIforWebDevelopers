// import express from "express";
import express from "express";
import bodyParser from "body-parser";
import notes from "./routes/notes.js";

const app = express();
// app.use(bodyParser());
app.use(express.json());

const port = 3000;
app.use('/notes', notes)


app.listen(port, () => {
    console.log(`The app is listening on port http://localhost:${port}`)
})

