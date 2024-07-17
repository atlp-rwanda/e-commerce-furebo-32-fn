import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Login";
import Contact from "./components/Contact";
import AppLayout from "./layout/appLayout";
import { ThemeProvider } from "@mui/material";
import { MuiTheme } from "./utils/config/muiTheme";
import Dashboard from "./components/Dashboard"; // Assuming you have Dashboard component
import ProtectedRoute from "./components/ProtectedRoute"; // Assuming you have ProtectedRoute component
import Product from "./components/Product";
import About from "./components/About";
import Signup from "./components/Signup";
import UpdatePasswordForm from "./components/updatePassword";
import ItemView from './components/ItemView'; // New addition
import SellerCollection from './components/SellerCollection'; // New addition
import './index.css';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={MuiTheme}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="contact" element={<Contact />} />
          <Route path="product" element={<Product />} />
          <Route path="about" element={<About />} />
          <Route path="signup" element={<Signup />} />
          <Route path="updatepassword" element={<UpdatePasswordForm />} />
          <Route path="item/:itemId" element={<ItemView />} /> {/* New addition */}
          <Route path="seller/collection" element={<SellerCollection />} /> {/* New addition */}
        </Route>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ThemeProvider>
  );
};

export { App };
