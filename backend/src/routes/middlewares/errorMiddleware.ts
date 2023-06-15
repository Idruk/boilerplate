import { Request, Response, NextFunction } from "express"

export default async (error: any, req: Request, res: Response, next: NextFunction) => {

    if (error.name === 'ValidationError') {
        error.status = 400
    }

    res.status(400).json(
        {
            error: {
                status: error.status,
                message: error.message,
            }
        }
    )

}