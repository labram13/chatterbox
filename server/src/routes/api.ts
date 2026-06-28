import express from 'express'
import userRouter from './controller/user'
import messageRouter from './controller/message'
import roomRouter from './controller/room'
const router = express.Router();

router.use('/user', userRouter)
router.use('/message', messageRouter)
router.use('/room', roomRouter)

export default router;