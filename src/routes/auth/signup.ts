import { Request, Response } from 'express'
import { User } from '../../models'

export default async function (req: Request, res: Response) {
    const {password, ...newUser} = await User.create(req.body)

    res.status(201).json(newUser)
}