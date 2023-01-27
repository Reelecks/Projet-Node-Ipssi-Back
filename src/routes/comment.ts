import express, { RequestHandler, Router } from 'express';
import db from "../db";
import { body, validationResult } from 'express-validator'

const app = Router()

const isUsersComment: RequestHandler = async (req, res, next) => {
  try {
      if (req.user.role == "ADMIN") {
          return next()
      }
      const isOwner = await db.comment.findFirstOrThrow({
          where: {
              userId: req.user.id
          }
      })
      if (isOwner) {
          return next()
      }
      throw new Error('You should not be here')
  } catch (e) {
      return res.status(400).json({ message: 'You are not the owner' })
  }
}

  app.get('/', async (req, res) => {
    const comment = await db.comment.findMany({
        where: {
            userId: req.user.id
        }
    })
    return res.status(200).json(comment)
})

  app.post(
    '/',
    body('postId').isUUID(),
    body('texte').exists().isString().notEmpty(),
    async (req, res) => {
      try {
        validationResult(req).throw()
        const createdComment  = await db.comment.create({
          data: {
            postId: req.body.postId,
            texte: req.body.texte,
            userId: req.user.id
          },
        })
  
        return res.status(201).json(createdComment)
      } catch (e) {
        return res.status(400).json({ message: e || 'Error during creation'})
      }
    }
  )
  
  app.put(
    '/:uuid',
    isUsersComment,
    body('texte').isLength({ min: 1 }),
    async (req, res) => {
      try {
        validationResult(req).throw()
        const updatedComment = await db.comment.update({
          where: {
            id: req.params?.uuid
          },
          data: {
            texte: req.body.texte
          }
        })
        res.status(200).json(updatedComment)
      } catch(e) {
        return res.status(400).json({ message: e || 'Error during update'})
      }
    }
  )
  
  app.delete(
    '/:uuid',
    isUsersComment,
    async (req, res) => {
      try {
        const deletedId = req.params.uuid
        await db.comment.delete({
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

export default app