import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 py-4 px-6 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="text-white text-2xl font-bold hover:text-blue-200"
        >
          Todo<span className="text-yellow-400">.ai</span>
        </Link>

        {/* Links */}
        <div className="space-x-4">
          <Link
            to="/add"
            className="text-black-400 bg-white px-4 py-2 rounded-md shadow hover:bg-yellow-300 hover:text-gray-800 transition duration-300"
          >
            Add Todo
          </Link>
        </div>
      </div>
    </nav>
  );
}
