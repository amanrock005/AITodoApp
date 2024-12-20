import express from "express";
import {
  addTodo,
  deleteTodo,
  getAllTodos,
  getSingleTodo,
  updateTodo,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/alltodos", getAllTodos);
router.post("/addtodo", addTodo);
router.delete("/deletetodo", deleteTodo);
router.put("/updatetodo/:id", updateTodo);
router.get("/singletodo/:id", getSingleTodo);

export default router;
