import { Request, RequestHandler, Response, Router } from "express";
import { body, check, validationResult } from "express-validator";
import db from "../db";
import isAdmin from "./comment"

const app = Router()

const isUsersPost: RequestHandler = async (req, res, next) => {
    try {
        const isOwner = await db.post.findFirstOrThrow({
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

app.get('/all', async (req, res) => {
    const currentYear = new Date().getFullYear();

    const postsFromLastYear = await db.post.findMany({
        where: {
            createdAt: {
                lt: new Date(`${currentYear}-01-01`)
            }
        }
    });
    const postsFromThisYear = await db.post.findMany({
        where: {
            createdAt: {
                gte: new Date(`${currentYear}-01-01`),
                lt: new Date(`${currentYear + 1}-01-01`)
            }
        }
    });
    const allPost = await db.post.findMany({
        include: {
            Comments: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return res.status(200).json(allPost)
})

app.get('/', async (req, res) => {
    const post = await db.post.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            Comments: true
        }
    })
    return res.status(200).json(post)
})

app.get('/:uuid', async (req, res) => {
    try {
        const post = await db.post.findFirstOrThrow({
            where: {
                id: req.params.uuid
            },
            include: {
                Comments: {
                    include: { user:true}
                },
                user:true
            }
        })

        return res.status(200).json(post)
    } catch (e) {
        return res.status(400).json({ message: 'Not found' })
    }
}
)

app.post(
    '/',
    body('title').exists().isString().notEmpty(),
    body('text').exists().isString().notEmpty(),
    async (req: Request, res: Response) => {
        try {
            validationResult(req).throw()
            const createdPost = await db.post.create({
                data: {
                    title: req.body.title,
                    text: req.body.text,
                    userId: req.user.id
                }
            })
            return res.status(200).json(createdPost)
        } catch (e) {
            console.log(e)
            return res.status(400).json({ error: e || 'Cannot create post' })
        }
    })

app.put(
    '/:uuid',
    isAdmin || isUsersPost,
    body('title').exists().isString().notEmpty(),
    body('text').exists().isString().notEmpty(),
    async (req, res) => {
        try {
            validationResult(req).throw()
            const updatedPost = await db.post.update({
                where: {
                    id: req.params?.uuid,
                },
                data: {
                    title: req.body.title,
                    text: req.body.text,
                }
            })

            return res.status(200).json(updatedPost)
        } catch (e) {
            return res.status(400).json({ message: e || 'Error while updating' })
        }
    })
//faire une condition qui vérifie le userId du post et le userId du signin
app.delete('/:uuid',
    isAdmin || isUsersPost,
    async (req, res) => {
        try {
            await db.post.delete({
                where: {
                    id: req.params.uuid
                }
            })
            return res.status(200).json({ message: `Succesfully deleted ${req.params.uuid}` })
        } catch (e) {
            return res.status(400).json({ message: e || 'Error while deleting' })
        }
    })

export default app
