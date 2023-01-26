import { User } from '@prisma/client'
import { RequestHandler } from 'express';
import jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt'
//pnpm add @types/bcrypt -d permet d'importer les types
//token a stocker dans les cookies
//fetch headers -> autorisations -> bearer token

export const createJWT = (user: User) => {
    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET as string // force le type
    );
    return token;
}
//Permet de vérifier sic l'utilisateur envoie un token valide
export const protect: RequestHandler = (req, res, next) => {
    console.log(req.headers.cookie)
    const bearer = req.headers.cookie
    if (!bearer) {
        return res.status(401).json({ message: 'Not authorized' })
    }
    const [, token] = bearer.split(' ') // récupère le token 
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'Not authorized' })
    }
    try {
        if (typeof process.env.JWT_SECRET !== 'string') {
            return res.status(401).json({ message: 'Not authorized' })
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as User
        req.user = payload
        next()
    } catch (e) {
        return res.status(401).json({ message: 'Not authorized' })
    }

}

export const comparePassword = (password: string, hash: string) => {
    return bcrypt.compare(password, hash)
}


export const hashPassword = (password: string) => {
    return bcrypt.hash(password, 10)
}