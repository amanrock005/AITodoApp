import express from "express";
import { openAIResponse } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", openAIResponse);

export default router;
