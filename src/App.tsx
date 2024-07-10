import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Contact from "./components/Contact";
import AppLayout from "./layout/appLayout";
import { ThemeProvider } from "@mui/material";
import { MuiTheme } from "./utils/config/muiTheme";
import About from './components/About';
import Product from './components/Product';
import Signup from './components/Signup';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={MuiTheme}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="contact" element={<Contact />} />
          <Route path="product" element={<Product />} />
          <Route path="about" element={<About />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export { App };
