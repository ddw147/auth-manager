import express from 'express'
import { login,register } from '../Controller/AuthController';
import { rateLimit } from 'express-rate-limit'
const router   = express.Router();


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

router.post('/login',limiter,login)
router.post('/register',register)

export default router

