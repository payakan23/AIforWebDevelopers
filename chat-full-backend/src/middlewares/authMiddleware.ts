import {Request, Response, NextFunction} from "express";
import User from "../entities/user";
export interface RequestWithUser extends Request{
    user: User
}
export default async (req: RequestWithUser, res: Response, next: NextFunction) => {
    let authHeader = req.header('Authorization');
    console.log(authHeader);
    if (authHeader == null) {
        return res.status(401).json({
            message: "Unauthenticated",
        })
    }
    let authToken = authHeader.split(' ').pop();

    if (authToken == null || authToken == authHeader) {
        return res.status(401).json({
            message: "Unauthenticated",
        })
    }


    let user = await User.findOneBy({authToken});
    if(user == null) {
        return res.status(401).json({
            message: "Unauthenticated",
        })
    }
    req.user = user;
    next();

}