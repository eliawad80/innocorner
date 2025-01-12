import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ServicePage from "./pages/ServicePage";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/services/:id" element={<ServicePage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;