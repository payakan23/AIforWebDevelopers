"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = __importDefault(require("./entities/user"));
const conversation_1 = __importDefault(require("./entities/conversation"));
const message_1 = __importDefault(require("./entities/message"));
const source = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    database: "chat_full",
    username: "",
    password: "",
    entities: [
        user_1.default,
        conversation_1.default,
        message_1.default
    ],
    synchronize: true
});
exports.default = source;
