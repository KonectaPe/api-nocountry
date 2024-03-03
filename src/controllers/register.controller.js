import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { AUTH_TOKEN } from "../configs/environments.js";

export const userRegister = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    const schemaRegister = Joi.object({
      fullName: Joi.string().trim().min(4).max(255).required(),
      username: Joi.string().trim().min(4).max(20).required(),
      email: Joi.string().trim().min(4).max(255).required().email(),
      password: Joi.string().trim().min(8).max(50).required(),
    });

    const { error } = schemaRegister.validate({
      fullName,
      username,
      email,
      password,
    });

    if (error) return res.json({ error: error.details[0].message });

    const isFullnameExist = await User.findOne({ fullName });
    const isUsernameExist = await User.findOne({ username });
    const isEmailExist = await User.findOne({ email });
    const isPasswordExist = await User.findOne({ password });

    if (isFullnameExist || isUsernameExist || isEmailExist || isPasswordExist)
      return res.json({ error: true, message: "El usuario ya existe" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const createdUser = new User({
      fullName,
      username,
      email,
      password: hashPassword,
    });
    const userSaved = await createdUser.save();

    const token = jwt.sign(
      {
        fullName: userSaved.fullName,
        username: userSaved.username,
        id: userSaved._id,
      },
      AUTH_TOKEN
    );
    return res.json({ token: token });
  } catch (error) {
    return res.json({ error: error.message });
  }
};
