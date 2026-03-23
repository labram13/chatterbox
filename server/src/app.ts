import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const PORT = 3000;

type User = {
    username: string,
    age: number
};

app.get('/', (req, res) => {
    const tessa: User = {
        username: "test",
        age: 12
    }
    res.status(200).json({status: "test", tessa})
    

    
})




app.listen(PORT, () => console.log("listening to port 3000"))
