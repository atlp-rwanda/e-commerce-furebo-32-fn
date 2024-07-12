import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState, AppDispatch } from '../store/store';
import { signupUser } from '../redux/slices/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/SignupForm.scss';

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '',
    role: 'buyer', 
  });

  const { error, signupSuccess, submittedEmail, loading } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (formData.password !== formData.rePassword) {
      toast.error('Passwords do not match.');
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
      toast.error('Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.');
      return;
    }

    if (!/^\+[1-9]\d{1,14}$/.test(formData.phone)) {
      toast.error("Please enter a valid phone number in international format starting with '+' with country code");
      return;
    }

    if (formData.firstName.length < 3 || formData.firstName.length > 20) {
      toast.error('First name must be between 3 and 20 characters long');
      return;
    }

    if (formData.lastName.length < 3 || formData.lastName.length > 20) {
      toast.error('Last name must be between 3 and 20 characters long');
      return;
    }
    if (!/^\+[1-9]\d{1,14}$/.test(formData.phone)) {
      toast.error("Please enter a valid phone number in international format starting with '+' with country code");
      return;
    }

    dispatch(signupUser(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (signupSuccess) {
      toast.success(`Signup successful! Please check your email (${submittedEmail}) for verification instructions.`);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rePassword: '',
        phone: '',
        role: 'buyer',
      });
    }
  }, [signupSuccess, submittedEmail]);

  return (
    <div className="container mx-auto py-8 signup-form">
      <ToastContainer /> 

      <h1 className="text-3xl font-bold text-center mb-8 text-blue-400">Create Your Account Here!</h1>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto signup-form__form">
        <div className="mb-4">
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="rePassword"
            name="rePassword"
            value={formData.rePassword}
            onChange={handleChange}
            placeholder="Re-enter Password"
            required
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </div>
      </form>
      <p>
        Already have an account?{' '}
        <NavLink to="/Login" className="login">
          Login
        </NavLink>
      </p>

    
    </div>
  );
};

export default SignupForm;
