import logo from "./logo.svg";
import "./App.css";
import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Myprofile from "./components/Myprofile";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";

export const store = createContext();

function App() {
  const [token, setToken] = useState(null);
  return (
    <div>
      <store.Provider value={[token, setToken]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Myprofile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myprofile" element={<Myprofile />} />
            <Route path="/dashboard" element={<Dashboard />} />

          </Routes>
        </BrowserRouter>
      </store.Provider>
    </div>
  );
}

export default App;
