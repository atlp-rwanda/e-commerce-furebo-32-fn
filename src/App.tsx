import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Contact from "./components/Contact";
import CounterComponent from './components/CounterComponent';

const App: React.FC = () => {
  return (
    <div>
      <h1>Geekmart</h1>
      <p>Welcome to Geekmart!</p>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
      <h2>Redux Counter Example</h2>
      <CounterComponent />
    </div>
  );
};

export { App };
