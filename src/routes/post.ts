import { timeStamp } from "console";
import { Request, RequestHandler, Response, Router } from "express";
import { body, check, validationResult } from "express-validator";
import db from "../db";

const app = Router()

const isUsersPost: RequestHandler = async (req, res, next) => {
    try {
        if (req.user.role == "ADMIN") {
            return next()
        }
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
    const allPost = await db.post.findMany({
        include: {
            Comments: {
                include: { user: true }
            },
            user: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return res.status(200).json(allPost)
})

app.get('/filter', async (req, res) => {
    let filter={}
    const date = new Date(Number(req.query.from))
    if(req.query.from){
        filter={
            where:{
                createdAt:{
                    gte: date
                }
            }
        }
    }
    const post = await db.post.findMany(filter)
    return res.status(200).json(post)
})

// app.get('/filter', async (req, res) => {
//     try{
//     const postsFromThisYear = await db.post.findMany({
//         where: {
//             createdAt: {
//                 gte: new Date(`${timeStamp}-01-01`),
//             }
//         }
//     });
//     return res.status(200).json(postsFromThisYear) 
// } catch (e) {
//     return res.status(400).json({ message: 'Not found' })
// }
// })

  // const currentYear = new Date().getFullYear();

    // const postsFromLastYear = await db.post.findMany({
    //     where: {
    //         createdAt: {
    //             lt: new Date(`${currentYear}-01-01`)
    //         }
    //     }
    // });

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
        console.log(req.params.uuid)
        const post = await db.post.findFirstOrThrow({
            where: {
                id: req.params.uuid
            },
            include: {
                Comments: {
                    include: { user: true }
                },
                user: true
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
    isUsersPost,
    body('title').exists().isString().notEmpty(),
    body('text').exists().isString().notEmpty(),
    async (req, res) => {
        try {
            console.log("hello");
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
    isUsersPost,
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
