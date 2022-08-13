import { Router } from "express";
import { createPost, deletePost, getAllPosts, getPost, updatePost } from "../controllers/post";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router()
router.get('/', authMiddleware, getAllPosts)
router.get('/:id', authMiddleware, getPost)
router.post('/', authMiddleware, createPost)
router.patch('/:id', authMiddleware, updatePost)
router.delete('/:id', authMiddleware, deletePost)

export default router
