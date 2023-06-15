import Joi from "joi"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express"
import userModel from "../models/userModel"

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req

    const validation = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    })

    const { value, error } = validation.validate(body)

    if (error) {
        return next(error)
    }

    const { username, password } = value

    const userExist = await userModel.findOne({
        where: {
            username
        }
    })

    if (userExist) {
        return res.status(409).json({ error: "User already exists" })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    await userModel.create({ username, password: hashPassword })

    res.status(200).json({ success: true })
}

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req

    const validation = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    })
    const { value, error } = validation.validate(body)

    if (error) {
        return next(error)
    }

    const { username, password } = value

    const user = await userModel.findOne({
        where: {
            username
        }
    })

    if (!user) {
        return res.status(404).json({ error: "User doesn't exists" })
    }

    const matchPassword = await bcrypt.compare(password, user.password)

    if (!matchPassword) {
        return res.status(401).json({ error: "Invalid password" })
    }

    const payload = { id: user.id }
    const token = jwt.sign(payload, "secret", { expiresIn: '1h' })

    res.status(200).json({ token: token })
}