import { X } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function AiChatBot({ onClose }) {
  const [userInput, setUserInput] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChatSubmit = async () => {
    if (!userInput.trim()) return;

    try {
      setLoading(true);
      setBotResponse("");

      const response = await axios.post("http://localhost:5000/api/chat", {
        userInput: userInput,
      });

      setBotResponse(response.data.message || "No response");
    } catch (err) {
      console.error("error fetching response: ", err);
      setBotResponse("sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Chat With AI</h2>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="how to do [task_name]?"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
          />
          <button
            onClick={handleChatSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Ask"}
          </button>
        </div>
        {botResponse && (
          <div
            className="p-4 bg-gray-100 rounded-md text-gray-800"
            style={{
              maxHeight: "300px", // Adjust the height to your needs
              overflowY: "auto", // Enable vertical scrolling when the content exceeds maxHeight
              wordWrap: "break-word", // Prevents long words from breaking the layout
            }}
          >
            <p>{botResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
}
