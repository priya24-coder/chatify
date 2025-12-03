import express from "express";

const router = express.Router();

router.get("/signup", (reg, res) => {
    res.send("Signup endpoint");
});

router.get("/login", (reg, res) => {
    res.send("Login endpoint");
});

router.get("/logout", (reg, res) => {
    res.send("Logout endpoint");
});

export default router; 