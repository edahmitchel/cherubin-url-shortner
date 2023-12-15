import { Response, Request } from 'express';
import shortUrl, { ShortURL } from '../models/shortUrl.model';
import analytics from '../models/analytics.model';
import { nanoid } from 'nanoid';

export async function createShortUrl(req: Request, res: Response) {
    const { destination, alias } = req.body;
    const userId = req.user.userId;

    try {
        let shortId: string;

        // Check if an alias is provided in the request body
        if (alias) {
            // Check if the provided alias is already in use
            const existingShortUrl = await shortUrl.findOne({ shortId: alias }).lean();
            if (existingShortUrl) {
                return res.status(400).json({ message: 'Alias is already in use' });
            }

            shortId = alias;
        } else {
            // Generate a short random ID using nanoid
            shortId = nanoid(8);
        }

        const newShortUrl = await shortUrl.create({
            destination: destination,
            user: userId,
            shortId: shortId,
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
