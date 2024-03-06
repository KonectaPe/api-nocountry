import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { AUTH_TOKEN } from "../configs/environments.js";

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schemaLogin = Joi.object({
      email: Joi.string().trim().min(4).max(20).required().email(),
      password: Joi.string().trim().min(8).max(50).required(),
    });

    const { error } = schemaLogin.validate({ email, password });

    if (error) return res.json({ error: error.details[0].message });

    const user = await User.findOne({
      email,
    });

    if (!user) return res.status(401).json({ error: "Usuario no encontrado" });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(401).json({ error: "Usuario no encontrado" });

    const token = jwt.sign(
      {
        fullName: user.fullName,
        username: user.username,
        id: user._id,
      },
      AUTH_TOKEN
    );
    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token: token,
    });
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};
