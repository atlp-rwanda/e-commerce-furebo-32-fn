import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";  // Assuming you have Login component
import Contact from "./components/Contact";  // Assuming you have Contact component

export const App = () => {
  return (
    <div>
      <h1>Geekmart</h1>
      <p>Welcome to Geekmart!</p>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="contact" element={<Contact />} />
      </Routes>
      </div>
  );
}
