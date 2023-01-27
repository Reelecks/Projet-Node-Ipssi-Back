import express from 'express'
import db from '../db'
import { Request, RequestHandler, Response, Router } from "express";

const app = express.Router()

const isAdmin: RequestHandler = async (req, res, next) => {
  try {
    if (req.user.role == "ADMIN") {
      return next()
    }
    throw new Error('You should not be here')
  } catch(e) {
    return res.status(400).json({ message: 'You are not the owner' })
  }
} 

app.delete(
    '/user/:uuid',
    isAdmin,
    async (req, res) => {
      try {
        const deletedId = req.params.uuid
        await db.user.delete({
          where: {
            id: deletedId
          } 
        })
        res.status(200).json({ message: `Successfully deleted ${deletedId}`})
      } catch(e) {
        return res.status(400).json({ e: e || 'Error during deletion'})
      }
    }
  )

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