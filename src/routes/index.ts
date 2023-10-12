
import { Express, Response, Request } from "express"
import { createShortUrl, getAnalytics, handleRedirect } from "../controllers/shortUrl.controller"
import validateResource from "../middleware/validateResource"
import shortUrlSchema from "../schemas/createShortUrl.schema"
import { loginUser, registerUser } from "../controllers/auth.controller"
import registrationSchema from "../schemas/registration.schema"
import loginSchema from "../schemas/login.schema"
import { authenticateToken } from "../middleware/auth.middleware"
function routes(app: Express) {
    app.get("/check", (req: Request, res: Response) => {
        return res.send("works")


    })
    // Authentication routes
    app.post('/auth/signup', validateResource(registrationSchema), registerUser);
    app.post('/auth/login', validateResource(loginSchema), loginUser);
    //   
    app.post("/api/url", authenticateToken, validateResource(shortUrlSchema), createShortUrl)
    app.get("/short/:shortId", handleRedirect)
    app.get("/api/analytics", getAnalytics)


}
export default routes