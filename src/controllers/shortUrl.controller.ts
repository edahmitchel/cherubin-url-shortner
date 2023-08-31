import { Response, Request } from 'express';
import shortUrl from '../models/shortUrl.model';
export async function createShortUrl(req: Request, res: Response) {
    const { destination } = req.body


    const newShortUrl = await shortUrl.create(
        {
            destination
        }
    )
    return res.status(201).json({ message: "success", data: { newShortUrl } })
}