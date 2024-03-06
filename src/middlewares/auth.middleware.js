import jwt from "jsonwebtoken";
import { AUTH_TOKEN } from "../configs/environments.js";

export const auth = (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token)
      return res.status(401).json({ error: "Acceso denegado, usuario no autorizado" });

    const verified = jwt.verify(token, AUTH_TOKEN);

    req.user = verified;
    next();
  } catch (error) {
    return res.status(501).json({ error: "Token no válido" });
  }
};
