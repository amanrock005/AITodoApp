import { axiosInstance } from "../lib/axiosInstance";
import { useState } from "react";

export default function AddTodo() {
  const [formData, setFormData] = useState({
    title: " ",
    description: " ",
    status: "pending",
    dueDate: " ",
  });

  const [message, setMessage] = useState(" ");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/todos/addtodo", formData);
      console.log("Response: ", response); // Log response
      setMessage(response.data.message);
      setFormData({
        title: "",
        description: "",
        status: "pending",
        dueDate: "",
      });
    } catch (err) {
      console.error("error adding todo: ", err.message);
      setMessage("error: unable to add todo.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
        Add New Todo
      </h2>
      {message && (
        <p className="text-green-600 font-semibold mb-4 text-center">
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter todo title"
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
            rows="3"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full px-3 py-2 border rounded-md focus:outline none focus:ring-2 focus:ring-blue-400"
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">completed</option>
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
            className="bg-blue-600 text-white font-semibodl px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Add Todo
          </button>
        </div>
      </form>
    </div>
  );
}
