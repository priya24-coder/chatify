import express from "express";

const router = express.Router();

router.get("/send", (reg, res) => {
    res.send("Send message endpoint");
})

export default router;