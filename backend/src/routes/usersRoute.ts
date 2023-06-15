import { Router } from "express"
import { register, signin } from "../controllers/userController"

const userRoute = Router()

userRoute.post('/register', register)
userRoute.post('/signin', signin)

export default userRoute;