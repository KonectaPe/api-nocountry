import jwt from "jsonwebtoken";
import { AUTH_TOKEN } from "../configs/environments.js";
import User from "../models/User.js";

export const verifyToken = async (req, res) => {
  const { token } = req.headers;

  if (!token) return res.status(404).send(false);

  jwt.verify(token, AUTH_TOKEN, async (error, user) => {
    if (error) return res.status(401);
    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401);
    return res.status(200).json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
