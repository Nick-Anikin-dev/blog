import { RequestHandler } from "express";
import { ApiError } from "../errors/ApiError";
import { Post } from "../models/post";

export const createPost: RequestHandler = async (req, res, next) => {
    try {
        const post = await Post.create({...req.body})
        return res
            .status(200)
            .json({message: 'Post was successfully create', data: post})
    } catch (e) {
        next(ApiError.internal('Failed to create new post'))
    }
}

export const deletePost: RequestHandler = async (req, res, next) => {
    try {
        const {id} = req.params
        const post = Post.findOne({where: {id}})
        if (!post) {
            next(ApiError.notFound(`There is no post with id: ${id}`))
        }
        await Post.destroy({where: {id}})
        return res
            .status(200)
            .json({message: 'Post was successfully deleted', data: {result: true}})

    } catch (e) {
        next(ApiError.internal('Failed to delete new post'))
    }
}

export const updatePost: RequestHandler = async (req, res, next) => {
    try {
        const {id} = req.params
        const post = Post.findOne({where: {id}})
        if (!post) {
            next(ApiError.notFound(`There is no post with id: ${id}`))
        }
        const updated = await Post.update({...req.body}, {where: {id}})
        return res
            .status(200)
            .json({message: 'Post was successfully updated', updated})

    } catch (e) {
        next(ApiError.internal('Failed to delete new post'))
    }
}


export const getAllPosts: RequestHandler = async (req, res, next) => {
    try {
        return await Post.findAll()
    } catch (e) {
        next(ApiError.internal('Failed to fetch posts'))
    }
}

export const getPost: RequestHandler = async (req, res, next) => {
    try {
        const {id} = req.params
        const post = Post.findOne({where: {id}})
        if (!post) {
            next(ApiError.notFound(`There is no post with id: ${id}`))
        }
        return res
            .status(200)
            .json(post)

    } catch (e) {
        next(ApiError.internal('Failed to fetch post'))
    }
}
