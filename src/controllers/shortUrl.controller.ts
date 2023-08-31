import { Response, Request } from 'express';
import shortUrl, { ShortURL } from '../models/shortUrl.model';
export async function createShortUrl(req: Request, res: Response) {
    const { destination } = req.body


    const newShortUrl = await shortUrl.create(
        {
            destination: destination
        }
    )
    return res.status(201).json({ message: "success", data: { newShortUrl } })
}
export async function handleRedirect(req: Request, res: Response) {
    const { shortId } = req.params
    console.log({ shortId });

    const short = await shortUrl.findOne({ shortId: shortId }).lean()

    if (!short) {

        return res.sendStatus(404)
    }

    return res.redirect(short.destination)
}