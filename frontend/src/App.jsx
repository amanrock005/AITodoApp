import { Route, Routes } from "react-router-dom";
import AddTodo from "./components/AddTodo";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import UpdateTodo from "./components/UpdateTodo";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddTodo />} />
        <Route path="update/:id" element={<UpdateTodo />} />
      </Routes>
    </div>
  );
}

export default App;
