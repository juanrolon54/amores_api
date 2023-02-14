import { Request, Response } from 'express'
import { User } from '../../models'
import jwt from 'jsonwebtoken'

export default async function ({body}: Request, res: Response) {
    if (!body.email) return res.status(400).send("Email is required.")
    if (!body.password) return res.status(400).send("Password is required.")

    const {password, email} = body
    
    const foundUser = await User.findOne({ email })
    
    if (!foundUser) return res.status(401).send("Invalid email.")

    const isPasswordValid = await foundUser.comparePassword(password)

    if (!isPasswordValid) return res.status(401).send("Invalid password.")

    const Authorization = jwt.sign(foundUser._id, String(process.env.SECRET), { expiresIn: 86400 })

    res.status(200).send(Authorization)
}