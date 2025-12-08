import express from "express";
import { signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.get("/login", (reg, res) => {
    res.send("Login endpoint");
});

router.get("/logout", (reg, res) => {
    res.send("Logout endpoint");
});

export default router; 