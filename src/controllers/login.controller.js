import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { AUTH_TOKEN } from "../configs/environments.js";

export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const schemaLogin = Joi.object({
      username: Joi.string().trim().min(4).max(255).required(),
      password: Joi.string().trim().min(8).max(255).required(),
    });

    const { error } = schemaLogin.validate({ username, password });

    if (error) return res.json({ error: error.details[0].message });

    const user = await User.findOne({
      username,
    });

    if (!user) return res.json({ error: "Usuario no encontrado" });

    const validPassword = password == user.password;

    if (!validPassword) return res.json({ error: "Usuario no encontrado" });

    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      AUTH_TOKEN
    );
    return res.json({ token });
  } catch (error) {
    return res.json({ error: error.message });
  }
};
