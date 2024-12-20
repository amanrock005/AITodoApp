import Todo from "../models/todo.model.js";

export const addTodo = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const newTodo = new Todo({
      title,
      description,
      status: status || "pending",
      dueDate: dueDate || null,
    });

    const savedTodo = await newTodo.save();

    return res
      .status(201)
      .json({ message: "Todo added successfully", todo: savedTodo });
  } catch (err) {
    console.error("error adding todo: ", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json({ todos });
  } catch (err) {
    console.error("error fetching todos: ", err.message);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, dueDate } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, status, dueDate },
      { new: true, runValidators: true }
    );

    if (!updateTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (err) {
    console.error("error updating todo: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Todo ID is required" });
    }
    const deleteTodo = await Todo.findByIdAndDelete(id);
    if (!deleteTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error("error deleting todo: ", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSingleTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (err) {
    console.error("error fetching todo: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
