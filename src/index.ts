import express from 'express'
import * as dotenv from 'dotenv'
import userRoutes from './routes/user'
import postRoutes from './routes/post'
import commentRoutes from './routes/comment'
import db from './db'
import { protect } from './modules/auth'
import { signIn, createNewUser } from './handlers/user'
import config from './config'
dotenv.config()

const app = express()
const PORT = config.port
app.use(express.json())
app.listen(PORT, ()=>{
    console.log('Listening on localhost:', PORT)
})

app.get('/', (req, res) =>{
    console.log(process.env.DATABASE_URL)
    res.status(200).json({message:  'hello'})
})

app.use('/api',protect,  [userRoutes])
app.use('/api/post', protect, [postRoutes])
app.use('/api/comment', protect, [commentRoutes])

app.post('/signup', createNewUser)
app.post('/signin', signIn)