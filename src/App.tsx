import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Contact from "./components/Contact";
import AppLayout from "./layout/appLayout";
import { ThemeProvider } from "@mui/material";
import { MuiTheme } from "./utils/config/muiTheme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={MuiTheme}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export { App };
