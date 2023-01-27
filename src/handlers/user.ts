//creer handler validator qui intervient avant les handler connexioin/creation qui vérifie le body req -> pas se répéter
//express-validator lib 
import { Role } from "@prisma/client";
import { Request, RequestHandler } from "express";
import db from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

interface TypeRequestParam extends Request {
  body: {
    username?: string;
    password?: string;
    role?: Role;
  };
}

export const createNewUser: RequestHandler = async (
  req: TypeRequestParam,
  res
) => {
  try {
    if (!(req.body?.username && req.body?.password && req.body?.role)) {
      throw new Error("Invalid body provided");
    }
    const hash = await hashPassword(req.body.password);
    const user = await db.user.create({
      data: {
        username: req.body.username,
        password: hash,
        role: req.body.role,
      },
    });
    const token = createJWT(user);

    return res.status(201).json({ token });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};

export const signIn: RequestHandler = async (req: TypeRequestParam, res) => {
  try {
    if (!(req.body?.username && req.body?.password)) {
      throw new Error("Invalid body provided");
    }
    const user = await db.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      const isValid = await comparePassword(req.body.password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const token = createJWT(user);
      return res.status(200).json({ token });
    }
  } catch (e) {
    return res.status(400).json({ error: e?.toString() });
  }
};

