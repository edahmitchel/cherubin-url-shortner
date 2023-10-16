import { AnyObjectSchema } from "yup";
import { NextFunction, Request, Response } from 'express';

const validateResource = (resourceSchema: AnyObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await resourceSchema.validate(
            {
                body: req.body, query: req.query, params: req.params
            }
        )
        next()
    } catch (error) {
        console.log(error);


        return res.status(400).json(error)

    }

}
export default validateResource
// import { AnyObjectSchema } from "yup";
// import { Request, Response, NextFunction } from "express";

// const validateResource = (resourceSchema: AnyObjectSchema) => async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         await resourceSchema.validate({
//             body: req.body,
//             query: req.query,
//             params: req.params,
//         });
//         next();
//     } catch (e) {
//         return res.status(400).send(e);
//     }
// };

// export default validateResource;