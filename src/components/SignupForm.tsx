import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
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
  const [error, setError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
       if (formData.password !== formData.rePassword) {
         setError('Passwords do not match.');
         return;
       }
    try {
      const response = await axios.post('https://e-commerce-furebo-32-bn-1.onrender.com/api/users/signup', formData);
      console.log(response.data);
      setSignupSuccess(true);
      await sendVerificationEmail(formData.email); 
      setSubmittedEmail(formData.email); 
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rePassword: '',
        phone: '',
        role: 'buyer',
      });
      setError(null);
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  const sendVerificationEmail = async (email: string) => {
    try {
      await axios.post(
        'https://e-commerce-furebo-32-bn-1.onrender.com/api/users/verify-email?token',
        { email },
      );
      console.log(`Verification email sent to ${email}.`);
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  };

  return (
    <div className="container mx-auto py-8 signup-form">
      <h1 className="text-3xl font-bold text-center mb-8">
        Create Your Account Here!
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto signup-form__form"
      >
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
            id="passwordd"
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

        <div className="flex items-center justify-between">
          <button type="submit" className="button">
            Sign Up
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
          Signup successful! Please check your email ({submittedEmail}) for
          verification instructions.
        </div>
      )}
    </div>
  );
};

export default SignupForm;
