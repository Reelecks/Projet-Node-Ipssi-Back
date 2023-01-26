import express from 'express'

const app = express.Router()

app.get('/user',async (req, res)=>{
    return res.status(200).json(req.user)
})



export default app