"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const note_1 = __importDefault(require("./enities/note"));
const myDataSource = new typeorm_1.DataSource({
    host: "localhost",
    type: "postgres",
    port: 5432,
    database: "ai_dojo_notes",
    username: "",
    password: "",
    entities: [
        note_1.default,
    ],
    synchronize: true
});
exports.default = myDataSource;
