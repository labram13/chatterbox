import express from 'express'
import userRouter from './controller/user'
import messageRouter from './controller/message'
import directMessageRouter from './controller/direct_message'
const router = express.Router();

router.use('/user', userRouter)
router.use('/message', messageRouter)
router.use('/dms', directMessageRouter)

export default router;