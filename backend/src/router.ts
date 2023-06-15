import { Router } from "express"
import userRoute from "./routes/usersRoute"

const router = Router()

router.use("/user", userRoute)

export default router;