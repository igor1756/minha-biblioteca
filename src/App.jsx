import { Routes, Route } from "react-router-dom";
import BookList from "./pages/BookList";
import HomePage from "./pages/HomePage";

// src/App.jsx
function App() {
  return (
    <div className="container mt-4">
      <Routes>
        {/* Rota da página inicial */}
        <Route path="/" element={<HomePage />} />
        {/* Rota da página de lista de livros */}
        <Route path="/livros" element={<BookList />} />
      </Routes>
    </div>
  );
}

export default App;