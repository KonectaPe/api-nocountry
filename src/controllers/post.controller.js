import Joi from "joi";
import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      user: req.user.id,
    }).populate("user");
    res.status(200).json(posts);
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, description, link, image } = req.body;
    const schemaPost = Joi.object({
      title: Joi.string().trim().max(255).required(),
      description: Joi.string().trim().max(255).required(),
      link: Joi.string().trim().max(255).required(),
      image: Joi.string().trim().max(510).required(),
    });

    const { error } = schemaPost.validate({
      title,
      description,
      link,
      image,
    });

    if (error) return res.status(501).json({ error: error.details[0].message });

    const newPost = new Post({
      title,
      description,
      link,
      image,
      user: req.user.id,
    });

    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost)
      return res.status(404).json({ message: "Post no encontrado" });
    return res.status(200).json({ message: "Post eliminado" });
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, description, link, image } = req.body;
    const postUpdate = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { title, description, link, image },
      { new: true }
    );
    return res.status(200).json(postUpdate);
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};

export const allPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};
