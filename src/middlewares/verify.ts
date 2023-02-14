import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { Permit, User } from "../models";

export default {
    async authorization(permits: string[]) {
        
        const foundPermits = await Permit.find({ name: permits })
        const requiredPermits = foundPermits.map(permit => String(permit._id))
        
        return async (req:Request, res:Response, next:NextFunction)=> {
            try {
                if (!req.headers.authorization) return res.status(400).send("Lacking token.")
                const token = String(req.headers.authorization.split(' ').pop())
                
                const isValid = jwt.verify(token, String(process.env.SECRET))
                
                if (!isValid) return res.status(401).send("Invalid token.")
    
                const userId = jwt.decode(token)
    
                const foundUser = await User.findOne({ _id: userId })
                
                if (!foundUser) return res.status(403).send("The token does not belong to any person. That's pretty odd.")
                
                if (!requiredPermits.every(required => foundUser.permits.includes(required))) return res.status(401).send("Not enough permission.")
                    
                next()
            } catch(e) {
                console.log('Authentication middleware:\n', e)
                res.status(500).send("Error in authentication middleware.")
            }
        }
    }
}