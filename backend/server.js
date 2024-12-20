import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import todoRoutes from "./routes/todo.route.js";
import chats from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);
app.use("/api/chat", chats);

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
  connectDB();
});
