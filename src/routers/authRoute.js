import express from "express";
import { login, logout, signup } from "../controllers/authController.js";
const router = express.Router();

router.get("/logout", logout);
router.post("/login", login);
router.post("/signup", signup);

export default router;
