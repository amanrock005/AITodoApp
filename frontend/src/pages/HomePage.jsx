import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Bot, ClipboardPenLine, Trash2 } from "lucide-react";
import AiChatBot from "../components/AiChatBot";

export default function HomePage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/todos/alltodos"
      );
      setTodos(response.data.todos);
      setLoading(false);
    } catch (err) {
      console.error("error fetching todos ", err.message);
      setError("unable to fetch todos.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = async (todoId) => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/todos/deletetodo",
        {
          data: { id: todoId },
        }
      );

      alert(response.data.message || "Todo deleted successfully");
      fetchTodos();
    } catch (err) {
      console.error("error deleting todo: ", err.message);
      alert(
        err.response?.data?.message ||
          "failed to delete the todo. Please try again"
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        All Todos
      </h2>
      {loading && <p className="text-center text-gray-700">Loading ....</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && todos.length === 0 && (
        <p className="text-center text-gray-600">No Todos available.</p>
      )}

      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="relative flex justify-between items-start bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500"
          >
            {/* Left Section: Todo Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {todo.title}
              </h3>
              {todo.description && (
                <p className="text-gray-600 mt-1">{todo.description}</p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Status: <span className="font-medium">{todo.status}</span>
              </p>
              {todo.dueDate && (
                <p className="text-sm text-gray-500">
                  Due Date: {new Date(todo.dueDate).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Right Section: Icons at Bottom Right */}
            <div className="absolute bottom-2 right-2 flex space-x-4">
              {/* Update Icon */}
              <div className="group relative">
                <Link
                  to={`/update/${todo._id}`}
                  className="text-blue-600 hover:text-blue-800 transition duration-300"
                >
                  <ClipboardPenLine size={20} />
                </Link>
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Update
                </span>
              </div>

              {/* Delete Icon */}
              <div className="group relative">
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="text-red-600 hover:text-red-800 transition duration-300"
                >
                  <Trash2 size={20} />
                </button>
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Delete
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* <div className="fixed bottom-6 right-6 group">
        <Link
          to=""
          className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-110"
        >
          <Bot
            size={24}
            className="group-hover:scale-125 transition-transform duration-300"
          />
        </Link>
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Ask AI
        </span>
      </div> */}
      <div className="relative">
        <div className="fixed bottom-6 right-6 group">
          <button
            onClick={() => setIsChatbotOpen((prev) => !prev)}
            className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-110"
          >
            <Bot
              size={24}
              className="group-hover:scale-125 transition-transform duration-300"
            />
          </button>
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Ask AI
          </span>
        </div>
        {isChatbotOpen && <AiChatBot onClose={() => setIsChatbotOpen(false)} />}
      </div>
    </div>
  );
}
