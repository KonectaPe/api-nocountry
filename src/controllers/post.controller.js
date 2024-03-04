import Joi from "joi";
import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      user: req.user.id,
    }).populate("user");

    // const informationPost = posts.map((el) => {
    //   return {
    //     id: el._id,
    //     title: el.title,
    //     description: el.description,
    //     url: el.link,
    //     user: {
    //       fullName: el.user.fullName,
    //       username: el.user.username,
    //       email: el.user.email,
    //     },
    //   };
    // });
    res.json(posts);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, description, link } = req.body;

    const schemaPost = Joi.object({
      title: Joi.string().trim().max(255).required(),
      description: Joi.string().trim().max(255).required(),
      link: Joi.string().trim().max(255).required(),
    });

    const { error } = schemaPost.validate({
      title,
      description,
      link,
    });

    if (error) return res.json({ error: error.details[0].message });

    const newPost = new Post({
      title,
      description,
      link,
      user: req.user.id,
    });

    await newPost.save();
    res.json(newPost);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.json({ message: "Post no encontrado" });
    return res.json({ message: "Post eliminado" });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const postUpdate = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { title, description, link },
      { new: true }
    );
    return res.json(postUpdate);
  } catch (error) {
    return res.json({ error: error.message });
  }
};
