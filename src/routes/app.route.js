import { Router } from "express";
import { userLogin } from "../controllers/login.controller.js";
import { responseServer } from "../controllers/response.controller.js";
import { userRegister } from "../controllers/register.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import {
  allPosts,
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../controllers/verifyToken.controller.js";

const router = Router();



// Verificar si el servidor está activo
router.get("/", responseServer);

// Endpoints auth
router.post("/login", userLogin);
router.post("/register", userRegister);
router.get("/verifyToken", verifyToken);

// Endpoints post
router.get("/posts", auth, getPosts);
router.post("/posts", auth, createPost);
router.delete("/posts/:id", auth, deletePost);
router.put("/posts/:id", auth, updatePost);
router.get("/allposts", allPosts);

export default router;
