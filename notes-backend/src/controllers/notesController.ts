import {attachControllers, Controller, Delete, Get, Patch, Post, Req, Res} from "@decorators/express";
import {Express, Request, Response} from "express";
import Note from "../enities/note";
import {Equal} from "typeorm";

@Controller('/notes')
class NotesController {
    @Get('/')
    async getAllNotes(@Res() res: Response, @Req() req: Request) {
        try {
            let results = await Note.find();
            return res.json({
                notes: results
            });
        } catch (e) {
            return res.status(500);
        }

    }

    @Get('/:id')
    async getOneOne(@Res() res: Response, @Req() req: Request) {
        try {
            const numberId = Number(req.params.id);
            let note = await Note.findOneBy({id: Equal(numberId)});
            if (note == null) {
                return res.status(404);
            }
            return res.json({
                note: note
            });
        } catch (e) {
            return res.status(500);
        }

    }

    @Delete('/:id')
    async deleteNote(@Res() res: Response, @Req() req: Request) {
        try {
            const numberId = Number(req.params.id);
            let note = await Note.findOne({
                where: {
                    id: Equal(numberId)
                }
            });
            if (note == null) {
                return res.status(404);
            }

            await note.remove();
            return res.json({
                success: true
            })
        } catch (error) {
            return res.status(404);
        }
    }

    @Post('/')
    async createNewNote(@Res() res: Response, @Req() req: Request) {
        let newNote = new Note();
        newNote.title = req.body.title;
        newNote.body = req.body.body;
        try {
            const theCreatedNOte = await newNote.save();
            return res.json({
                note: theCreatedNOte
            });
        } catch (error) {
            return res.status(422);
        }
    }

    @Patch('/:id')
    async updateNote(@Res() res: Response, @Req() req: Request) {
        const numberId = Number(req.params.id);
        let note = await Note.findOneBy({id: Equal(numberId)})
        if (note == null) {
            return res.status(404);
        }
        note.title = req.body.title;
        note.body = req.body.body;

        try {
            const theCreatedNOte = await note.save();
            return res.json({
                note: theCreatedNOte
            });
        } catch (error) {
            return res.status(422);
        }
    }
}

export default NotesController;