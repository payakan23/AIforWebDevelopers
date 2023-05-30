"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const express_1 = require("@decorators/express");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const conversation_1 = __importDefault(require("../entities/conversation"));
// @ts-ignore
let ConversationController = class ConversationController {
    createNewConversation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let conversation = new conversation_1.default();
            conversation.title = req.body.title;
            let user = req.user;
            conversation.users = [user];
            try {
                conversation.save();
                return res.json(conversation);
            }
            catch (e) {
                return res.status(422).send();
            }
        });
    }
    getAllConversations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversations = yield conversation_1.default.find({
                relations: {
                    messages: true
                }
            });
            return res.json({
                conversations: conversations
            });
        });
    }
};
__decorate([
    (0, express_1.Post)('/'),
    __param(0, (0, express_1.Req)()),
    __param(1, (0, express_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "createNewConversation", null);
__decorate([
    (0, express_1.Get)('/'),
    __param(0, (0, express_1.Req)()),
    __param(1, (0, express_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "getAllConversations", null);
ConversationController = __decorate([
    (0, express_1.Controller)('/conversations', [authMiddleware_1.default])
], ConversationController);
exports.default = ConversationController;
