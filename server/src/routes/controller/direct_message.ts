import express from 'express'
const router = express()


router.get('/', (req, res) => {
    res.json({test: 'test'})
})

export default router