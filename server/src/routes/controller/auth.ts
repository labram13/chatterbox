import express from 'express'

const router = express.Router();


router.post('/', (req, res) => {


    res.status(200).json({status: 'success'})
})

export default router;