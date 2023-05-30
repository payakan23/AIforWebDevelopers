import {Controller, Get, Post, Req, Res} from "@decorators/express";
import authMiddleware, {RequestWithUser} from "../middlewares/authMiddleware";
import {Response} from "express";
import Conversation from "../entities/conversation";
// @ts-ignore
@Controller('/conversations', [authMiddleware])
export default class ConversationController {


    @Post('/')
    async createNewConversation(@Req() req: RequestWithUser, @Res() res: Response) {
        let conversation = new Conversation();

        conversation.title = req.body.title;
        let user = req.user;

        conversation.users = [user];
        try {
            conversation.save();
            return res.json(conversation);

        }catch (e) {
            return res.status(422).send();
        }
    }

    @Get('/')
    async getAllConversations(@Req() req: RequestWithUser, @Res() res: Response) {
        const conversations = await Conversation.find({
            relations: {
                messages: true
            }
        });
        return res.json({
            conversations: conversations
        })
    }

}