import { Router } from "express";
import { userLogin } from "../controllers/login.controller.js";
import { responseServer } from "../controllers/response.controller.js";

const router = Router();

router.get("/", responseServer);
router.post("/login", userLogin);

export default router;
