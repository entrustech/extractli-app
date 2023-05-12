import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Box, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';
import FileProcessor from "./components/FileProcessor";
import About from "./pages/About";
import Disclaimer from "./pages/Disclaimer";
import "./App.css";
import logo from "./logo.png";
import LandingPage from "./LandingPage/LandingPage";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <Link to="/">
            <img src={logo} alt="Extractli" className="logo" />
          </Link>
          <nav className="menu-links">
            <Link to="/">Home</Link>
            <Link to="/disclaimer">Disclaimer</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>
        <div className="content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/extract" element={<FileProcessor />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <footer className="footer">
          <Box maxWidth="md" style={{
              marginTop: '0.5em',
              textAlign: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              }}>
              <IconButton color="primary" component="a" href="https://www.facebook.com">
                  <Facebook />
              </IconButton>
              <IconButton color="primary" component="a" href="https://www.twitter.com">
                  <Twitter />
              </IconButton>
              <IconButton color="primary" component="a" href="https://www.linkedin.com">
                  <LinkedIn />
              </IconButton>
          </Box>
          © Entrustech Inc. {new Date().getFullYear()}
        </footer>
      </div>
    </Router>
  );
}

export default App;
