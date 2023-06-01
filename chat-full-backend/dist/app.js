"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const database_1 = __importDefault(require("./database"));
const express_2 = require("@decorators/express");
const authController_1 = __importDefault(require("./controllers/authController"));
const conversationController_1 = __importDefault(require("./controllers/conversationController"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
app.use((0, cors_1.default)());
const launch = () => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.initialize();
    yield (0, express_2.attachControllers)(app, [authController_1.default, conversationController_1.default]);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
launch();
