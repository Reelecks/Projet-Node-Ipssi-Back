import express from 'express'
import db from '../db'

const app = express.Router()

// app.get('/user/:uuid',async (req, res)=>{
//     const user = await db.user.findUnique({
//         where:{
//             id: req.params.uuid
//         }
//     })
//     if(user){
//         return res.status(200).json(req.user)
//     }
//     throw new Error('Cant Find this User')
// })



export default app