import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import FileProcessor from "./components/FileProcessor";
import About from "./pages/About";
import Disclaimer from "./pages/Disclaimer";
import "./App.css";
import logo from "./logo.png";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <Link to="/">
            <img src={logo} alt="Your Company Logo" className="logo" />
          </Link>
          <nav className="menu-links">
            <Link to="/">Home</Link>
            <Link to="/disclaimer">Disclaimer</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>
        <div className="content">
          <Routes>
            <Route path="/" element={<FileProcessor />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <footer className="footer">
          © Entrustech Inc. {new Date().getFullYear()}
        </footer>
      </div>
    </Router>
  );
}

export default App;
