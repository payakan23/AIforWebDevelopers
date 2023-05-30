import {Controller, Get, Post, Req, Res} from "@decorators/express";
import {Request, Response} from "express";
import User from "../entities/user";
import {generateToken, hash, verify} from "../helpers/hash";
import authMiddleware, {RequestWithUser} from "../middlewares/authMiddleware";

@Controller('/auth')
export default class AuthController {


    // @ts-ignore
    @Get('/me', [authMiddleware])
    async me(@Req() req: RequestWithUser, @Res() res: Response) {
        return res.json({user: req.user})
    }

    @Post('/signup')
    async signup(@Req() req: Request, @Res() res: Response) {

        let fields = ["firstName", "lastName", "username", "password"];
        fields.forEach(field => {
            let value = req.body[field];
            if (value == null || value.trim() == "") {
                return res.status(422).json({
                    message: `The field ${field} is required`
                });
            }
        });
        const {firstName, lastName, username, password} = req.body;
        let user = new User();
        let token = generateToken({
            userId: user.id,
        })
        user.firstName = firstName;
        user.lastName = lastName;
        user.username = username;
        user.password = await hash(password);
        user.authToken = token
        try {
            await user.save();
        } catch (error: any) {
            return res.json({
                message: error?.message ?? "Something went wrong."
            })
        }
        return res.json({
            user,
            token,
        });

    }

    @Post('/login')
    async login(@Req() req: Request, @Res() res: Response) {
        // install bcrypt
        // install jwt jsonwebtoken
        const {username, password} = req.body;
        if (username == null || password == null) {
            return res.status(422).json({
                message: "The username and password are required"
            });
        }

        const user = await User.findOneBy({username});
        if (user == null) {
            return res.status(401).json({
                message: "The username or password is incorrect"
            })
        }

        const verified = await verify(password, user.password);
        if (verified) {
            let token = generateToken({
                userId: user.id,
                username: user.username
            });

            user.authToken = token;
            try {
                await user.save();
            } catch (error) {
                return res.status(500).json({
                    message: "Something went wrong."
                })
            }
            return res.json({
                token
            });
        }

        return res.status(401).json({
            message: "The username or password is incorrect"
        })
    }
}