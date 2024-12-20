import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import path from "path";

import todoRoutes from "./routes/todo.route.js";
import chats from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);
app.use("/api/chat", chats);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
  connectDB();
});
