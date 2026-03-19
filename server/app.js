const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')

app.use(express())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.status(200).json({status: "success"})
})


app.listen('3000', () => console.log("server live on locahost:3000"))
