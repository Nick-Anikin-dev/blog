import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { check, login, registration } from "../controllers/user";

const router = Router()
router.post('/login', login)
router.post('/registration', authMiddleware, registration)
router.get('/', authMiddleware, check)

export default router
