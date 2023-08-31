import { Express, Response, Request } from "express"
import { createShortUrl, getAnalytics, handleRedirect } from "../controllers/shortUrl.controller"
import validateResource from "../middleware/validateResource"
import shortUrlSchema from "../schemas/createShortUrl.schema"
function routes(app: Express) {
    app.get("/check", (req: Request, res: Response) => {
        return res.send("works")


    })
    app.post("/api/url", validateResource(shortUrlSchema), createShortUrl)
    app.get("/:shortId", handleRedirect)
    app.get("/api/analytics", getAnalytics)

}
export default routes