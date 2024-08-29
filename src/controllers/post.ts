import { Request, Response } from "express";
import Post from "../models/Post";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const author = req.session.userId;
    const post = new Post({ title, content, author });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate("userId", "username email").exec();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("userId", "username email")
      .exec();
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.author.toString() !== req.session.userId) {
      return res.status(403).json({ error: "Not authorized" });
    }
    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.author.toString() !== req.session.userId) {
      return res.status(403).json({ error: "Not authorized" });
    }
    await post.remove();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error });
  }
};
