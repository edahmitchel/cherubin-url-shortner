"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var shortUrl_controller_1 = require("../controllers/shortUrl.controller");
var validateResource_1 = __importDefault(require("../middleware/validateResource"));
var createShortUrl_schema_1 = __importDefault(require("../schemas/createShortUrl.schema"));
var auth_controller_1 = require("../controllers/auth.controller");
var registration_schema_1 = __importDefault(require("../schemas/registration.schema"));
var login_schema_1 = __importDefault(require("../schemas/login.schema"));
var auth_middleware_1 = require("../middleware/auth.middleware");
var router = express_1.default.Router();
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
router.get("/check", function (req, res) {
    return res.send("works");
});
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
router.post('/auth/signup', (0, validateResource_1.default)(registration_schema_1.default), auth_controller_1.registerUser);
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
router.post('/auth/login', (0, validateResource_1.default)(login_schema_1.default), auth_controller_1.loginUser);
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
router.post("/url", auth_middleware_1.authenticateToken, (0, validateResource_1.default)(createShortUrl_schema_1.default), shortUrl_controller_1.createShortUrl);
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
router.get("/short/:shortId", shortUrl_controller_1.handleRedirect);
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
router.get("/analytics", shortUrl_controller_1.getAnalytics);
exports.default = router;
