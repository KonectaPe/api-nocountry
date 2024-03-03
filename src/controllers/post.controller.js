import Joi from "joi";
import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      user: req.user.id,
    }).populate("user");

    const informationPost = posts.map((el) => {
      return {
        title: el.title,
        description: el.description,
        url: el.url,
        user: {
          fullName: el.user.fullName,
          username: el.user.username,
          email: el.user.email,
        },
      };
    });

    res.json(informationPost);
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
