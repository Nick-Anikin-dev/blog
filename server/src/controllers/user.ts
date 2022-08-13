import { RequestHandler } from "express";
import { ApiError } from "../errors/ApiError";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateJwt = (id: number, email: string) => {
    return jwt.sign(
        {id, email},
        'secret',
        {expiresIn: '24h'}
    )
}

export const registration: RequestHandler = async (req, res, next)=>
{
    const {email, password, role} = req.body
    if (!email || !password) {
        return next(ApiError.badRequest('Некорректный email или password'))
    }
    const candidate = await User.findOne({where: {email}})
    if (candidate) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует'))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({email, role, password: hashPassword})
    const token = generateJwt(user.id, user.email)
    return res.json({token})
}

export const login: RequestHandler = async (req, res, next)=>
{
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})
    if (!user) {
        return next(ApiError.notFound(`User not with email: ${email}`))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
        return next(ApiError.internal(`Incorrect password`))
    }
    const token = generateJwt(user.id, user.email)
    return res.json({token})
}

export const check: RequestHandler = async (req, res, next) => {
    const user = req.headers['user']
    if (user){
        const {id, email} = JSON.parse(user as string)
        const token = generateJwt(id, email)
        return res.json({token})
    }

}
