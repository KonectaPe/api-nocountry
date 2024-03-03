import { Router } from "express";
import { userLogin } from "../controllers/login.controller.js";
import { responseServer } from "../controllers/response.controller.js";
import { userRegister } from "../controllers/register.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { createPost, getPosts } from "../controllers/post.controller.js";

const router = Router();

// Verificar si el servidor está activo
router.get("/", responseServer);

// Endpoints auth
router.post("/login", userLogin);
router.post("/register", userRegister);

// Endpoints post
router.get("/posts", auth, getPosts);
router.post("/posts", auth, createPost);

export default router;
