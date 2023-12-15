
import { Express, Response, Request } from "express"
import express from 'express';
import { createShortUrl, getAnalytics, handleRedirect } from "../controllers/shortUrl.controller"
import validateResource from "../middleware/validateResource"
import shortUrlSchema from "../schemas/createShortUrl.schema"
import { loginUser, registerUser } from "../controllers/auth.controller"
import registrationSchema from "../schemas/registration.schema"
import loginSchema from "../schemas/login.schema"
import { authenticateToken } from "../middleware/auth.middleware"
const router = express.Router()

/**
* @swagger
* /check:
*   get:
*     summary: Check if the API is working
*     responses:
*       200:
*         description: API is working
*       500:
*         description: API is not working
*/
router.get("/check", (req: Request, res: Response) => {
    return res.send("works")


})
// Authentication routes


/**
* @swagger
* /auth/signup:
*   post:
*     summary: Register a new user
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               username:
*                 type: string
*               email:
*                 type: string
*                 format: email
*               password:
*                 type: string
*     responses:
*       201:
*         description: User registered successfully
*       500:
*         description: User registration failed
*/
router.post('/auth/signup', validateResource(registrationSchema), registerUser);


/**
* @swagger
* /auth/login:
*   post:
*     summary: Log in as an existing user
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*                 format: email
*               password:
*                 type: string
*     responses:
*       200:
*         description: Login successful
*       401:
*         description: User not found or incorrect password
*       500:
*         description: Login failed
*/
router.post('/auth/login', validateResource(loginSchema), loginUser);
//   

/**
* @swagger
* /api/url:
*   post:
*     summary: Create a short URL
*     security:
*       - BearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               destination:
*                 type: string
*               alias:
*                 type: string
*     responses:
*       201:
*         description: Short URL created successfully
*       500:
*         description: Failed to create short URL
*/
router.post("/url", authenticateToken, validateResource(shortUrlSchema), createShortUrl)

/**
 * @swagger
 * /short/{shortId}:
 *   get:
 *     summary: Redirect to the original URL using a short ID
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         description: Short ID of the URL
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirects to the original URL
 *       404:
 *         description: Short URL not found
 */
router.get("/short/:shortId", handleRedirect)


/**
* @swagger
* /api/analytics:
*   get:
*     summary: Retrieve analytics data for short URLs
*     responses:
*       200:
*         description: Analytics data retrieved successfully
*       500:
*         description: Failed to retrieve analytics data
*         content:application/json:
 
*/
router.get("/analytics", getAnalytics)



export default router