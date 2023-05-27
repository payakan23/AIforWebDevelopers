"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("@decorators/express");
const notesController_1 = __importDefault(require("./controllers/notesController"));
const app = (0, express_1.default)();
const port = 3000;
const database_1 = __importDefault(require("./database"));
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
database_1.default.initialize().then(dataSource => {
    console.log(`The db is connected`);
}).catch(error => {
    console.log(error);
});
app.listen(port, () => {
    console.log(`This server is running.....`);
});
(0, express_2.attachControllers)(app, [notesController_1.default]).then(res => {
    console.log("The controllers has been attached");
});
// npm install typescript -g
// tsc --init or npx tsc --init -> Will generate tsconfig.json
// npm install @types/express;
