import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateTodo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    dueDate: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/todos/singletodo/${id}`
        );

        const dateObj = new Date(response.data.dueDate);

        setFormData({
          title: response.data.title,
          description: response.data.description,
          status: response.data.status,
          dueDate: response.data.dueDate,
        });
      } catch (err) {
        console.error("error fetching todo: ", err);
        setMessage("error fetching todo details");
      }
    };
    fetchTodo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/todos/updatetodo/${id}`,
        formData
      );
      console.log(response);
      setMessage(response.data.message);
      navigate("/");
    } catch (err) {
      console.log("error updating todo: ", err);
      setMessage("error: unable to update todo.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
        Update Todo
      </h2>
      {message && (
        <p className="text-green-600 font-semibold mb-4 text-center">
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Todo title"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            row="3"
            className="w-full px-3 py-2 border-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter todo description"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Status:
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="pending">Pending</option>
            <option value="in progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Due Date:
          </label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-400"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Update Todo
          </button>
        </div>
      </form>
    </div>
  );
}
