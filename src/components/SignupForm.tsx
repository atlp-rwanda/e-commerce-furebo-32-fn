import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState, AppDispatch } from '../store/store';
import { signupUser } from '../redux/slices/userSlice';
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

    if (formData.password !== formData.rePassword) {
      alert('Passwords do not match.');
      return;
    }

    dispatch(signupUser(formData));
  };

  useEffect(() => {
    if (signupSuccess) {
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
  }, [signupSuccess]);

  return (
    <div className="container mx-auto py-8 signup-form">
      <h1 className="text-3xl font-bold text-center mb-8">Create Your Account Here!</h1>

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

      {error && <p className="text-red-500">{error}</p>}

      {signupSuccess && (
        <div className="mb-4 text-green-500 text-center success-message">
          Signup successful! Please check your email ({submittedEmail}) for verification instructions.
        </div>
      )}
    </div>
  );
};

export default SignupForm;
