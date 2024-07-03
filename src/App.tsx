import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";  // Assuming you have Login component
import Contact from "./components/Contact";  // Assuming you have Contact component
import Product from "./components/Product";
import About from "./components/About";
import Signup from "./components/Signup";

export const App = () => {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="contact" element={<Contact />} />
      <Route path="product" element={<Product />} />
      <Route path="about" element={<About />} />
      <Route path="signup" element={<Signup />} />
      </Routes>
      </div>
  );
}
