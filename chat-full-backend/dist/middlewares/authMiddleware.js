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
const user_1 = __importDefault(require("../entities/user"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let authHeader = req.header('Authorization');
    console.log(authHeader);
    if (authHeader == null) {
        return res.status(401).json({
            message: "Unauthenticated",
        });
    }
    let authToken = authHeader.split(' ').pop();
    if (authToken == null || authToken == authHeader) {
        return res.status(401).json({
            message: "Unauthenticated",
        });
    }
    let user = yield user_1.default.findOne({
        where: { authToken }, select: {
            id: true,
            username: true,
            authToken: true,
        }
    });
    if (user == null) {
        return res.status(401).json({
            message: "Unauthenticated",
        });
    }
    req.user = user;
    next();
});
