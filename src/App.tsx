import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Contact from './components/Contact';
import AppLayout from './layout/appLayout';
import AdminLayout from './layout/adminLayout';
import { ThemeProvider } from '@mui/material';
import { MuiTheme } from './utils/config/muiTheme';
import Dashboard from './components/Dashboard'; // Assuming you have Dashboard component
import ProtectedRoute from './components/ProtectedRoute'; // Assuming you have ProtectedRoute component
import ProtectedAdmin from './components/ProtectedAdmin'; 
import {AdminDashboardPage} from './components/AdminDashboard'
import Product from './components/Product';
import About from './components/About';
import Signup from './components/Signup';
import Products from './components/seller/Products';
import Collection from './components/seller/Collection';
import Wishlist from './components/seller/Wishlist';
import SellerLayout from './layout/sellerLayout';
import UpdatePasswordForm from './components/updatePassword';
import UserManagement from './components/UserManagement';

import { RequestResetPassword } from './components/RequestResetPassword';
import { ResetPassword } from './components/resetPassword';
import SuccessPage from './components/checkout/sucessPage';
import CancelledPage from './components/checkout/cancelledPage';

const App: React.FC = () => {
  const [role, setRole] = useState(window.localStorage.getItem('role'));

  return (
    <ThemeProvider theme={MuiTheme}>
      <Routes>
        <Route
          path="/"
          element={role === 'seller' ? <SellerLayout /> : <AppLayout />}
        >
          {role !== 'seller' ? (
            <>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="contact" element={<Contact />} />
              <Route path="product" element={<Product />} />
              <Route path="about" element={<About />} />
              <Route path="signup" element={<Signup />} />
              <Route path="updatepassword" element={<UpdatePasswordForm />} />

              <Route
                path="requestResetPassword"
                element={<RequestResetPassword />}
              />
              <Route path="reset-password" element={<ResetPassword />} />

              <Route path="sucessorder/:id" element={<SuccessPage />} />
              <Route path="/cancelorder/:id" element={<CancelledPage />} />
            </>
          ) : (
            <>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="collection" element={<Collection />} />
              <Route path="wishlist" element={<Wishlist />} />
            </>
          )}
        </Route>
       
        {/* Protected Route for Admin Users Management */}

        <Route path="/dashboard" element={ 
          <ProtectedAdmin>
          <AdminLayout/>
          </ProtectedAdmin>}>
        <Route
          path="users"
          element={
            <ProtectedAdmin>
              <UserManagement />
            </ProtectedAdmin>
          }
        />
        <Route path="contacts" />
        <Route path="products" />
        <Route path="" element={<AdminDashboardPage />} />
                   
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export { App };
