import express from 'express'
import authRouter from './controller/auth'
const router = express.Router();

router.use('/auth', authRouter)

export default router;