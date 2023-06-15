import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken';
import UserModel from "../../models/userModel";

interface AuthPayload extends jwt.JwtPayload {
    id: string
}

export const requireLoggedIn = async (req: Request, res: Response, next: NextFunction) => {

    const tokenPart = req.headers.authorization?.split(" ")

    if (!tokenPart || tokenPart.length !== 2 || tokenPart[0] != "Bearer") {
        return res.status(401).json({ error: "Invalid authorization header" })
    }

    const token = tokenPart[1];

    if (token) {
        try {
            const payload = await <AuthPayload>jwt.verify(token, "secret")

            const user = await UserModel.findByPk(payload.id)

            if (!user) {
                return res.status(404).json({ error: "User not found" })
            }

        } catch (e) {
            return res.status(401).json({ error: "Invalid token" })
        }
    }

    await next();
}