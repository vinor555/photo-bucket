import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Album from "./pages/Dashboard/Dashboard";
import { AuthProvider } from "./services/auth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/dashboard" element={<Album />} />
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
