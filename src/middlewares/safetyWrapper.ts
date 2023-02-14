import { NextFunction, Request, Response } from "express";

// not exactly a middleware but more of a utility function

export default function (callback:Function, message:string) {
    return async function (req: Request, res: Response, next?: NextFunction) {
        try {
           await callback(req, res, next)
        } catch (error) {
            console.log(message, error)
            res.status(500).send("Unhandled error: \n"+message)
        }
    }
}