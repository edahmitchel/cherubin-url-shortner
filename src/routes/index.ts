import { Express, Response, Request } from "express"
function routes(app: Express) {
    app.get("/check", (req: Request, res: Response) => {
        res.send("works")

    })
}
export default routes