import express from 'express'
import userRouter from './controller/user'
import messageRouter from './controller/message'
const router = express.Router();

router.use('/user', userRouter)
router.use('/message', messageRouter)

export default router;