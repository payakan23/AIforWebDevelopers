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
const note_1 = __importDefault(require("../enities/note"));
const typeorm_1 = require("typeorm");
let NotesController = class NotesController {
    getAllNotes(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let results = yield note_1.default.find();
                return res.json({
                    notes: results
                });
            }
            catch (e) {
                return res.status(500);
            }
        });
    }
    getOneOne(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const numberId = Number(req.params.id);
                let note = yield note_1.default.findOneBy({ id: (0, typeorm_1.Equal)(numberId) });
                if (note == null) {
                    return res.status(404);
                }
                return res.json({
                    note: note
                });
            }
            catch (e) {
                return res.status(500);
            }
        });
    }
    deleteNote(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const numberId = Number(req.params.id);
                let note = yield note_1.default.findOne({
                    where: {
                        id: (0, typeorm_1.Equal)(numberId)
                    }
                });
                if (note == null) {
                    return res.status(404);
                }
                yield note.remove();
                return res.json({
                    success: true
                });
            }
            catch (error) {
                return res.status(404);
            }
        });
    }
    createNewNote(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let newNote = new note_1.default();
            newNote.title = req.body.title;
            newNote.body = req.body.body;
            try {
                const theCreatedNOte = yield newNote.save();
                return res.json({
                    note: theCreatedNOte
                });
            }
            catch (error) {
                return res.status(422);
            }
        });
    }
    updateNote(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const numberId = Number(req.params.id);
            let note = yield note_1.default.findOneBy({ id: (0, typeorm_1.Equal)(numberId) });
            if (note == null) {
                return res.status(404);
            }
            note.title = req.body.title;
            note.body = req.body.body;
            try {
                const theCreatedNOte = yield note.save();
                return res.json({
                    note: theCreatedNOte
                });
            }
            catch (error) {
                return res.status(422);
            }
        });
    }
};
__decorate([
    (0, express_1.Get)('/'),
    __param(0, (0, express_1.Res)()),
    __param(1, (0, express_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "getAllNotes", null);
__decorate([
    (0, express_1.Get)('/:id'),
    __param(0, (0, express_1.Res)()),
    __param(1, (0, express_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "getOneOne", null);
__decorate([
    (0, express_1.Delete)('/:id'),
    __param(0, (0, express_1.Res)()),
    __param(1, (0, express_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "deleteNote", null);
__decorate([
    (0, express_1.Post)('/'),
    __param(0, (0, express_1.Res)()),
    __param(1, (0, express_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "createNewNote", null);
__decorate([
    (0, express_1.Patch)('/:id'),
    __param(0, (0, express_1.Res)()),
    __param(1, (0, express_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "updateNote", null);
NotesController = __decorate([
    (0, express_1.Controller)('/notes')
], NotesController);
exports.default = NotesController;
