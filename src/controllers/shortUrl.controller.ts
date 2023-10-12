import { Response, Request } from 'express';
import shortUrl, { ShortURL } from '../models/shortUrl.model';
import analytics from '../models/analytics.model';
export async function createShortUrl(req: Request, res: Response) {
    const { destination } = req.body;
    const userId = req.user.userId;

    try {
        const newShortUrl = await shortUrl.create({
            destination: destination,
            user: userId,
        });
        return res.status(201).json({ message: 'Success', data: { newShortUrl } });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create short URL', error });
    }
}
export async function handleRedirect(req: Request, res: Response) {
    const { shortId } = req.params
    console.log({ shortId });

    const short = await shortUrl.findOne({ shortId: shortId }).lean()

    if (!short) {
        console.log({ shortIdIn: shortId });

        return res.sendStatus(404)
    }
    // await analytics.create({ shortUrl: shortId })

    return res.redirect(`https://${short.destination}`)
}

export async function getAnalytics(req: Request, res: Response) {
    const allAnaytics = await analytics.find({}).lean()

}
