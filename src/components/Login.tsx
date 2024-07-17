import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { GoogleLogin } from '@react-oauth/google';
import InputAdornment from '@mui/material/InputAdornment';
import { BASE_API_URL } from '../utils/constants/config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

     setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${BASE_API_URL}api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message ||
            'Invalid email or password, Please check your credentials.',
        );
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.data.user.role);
      localStorage.setItem('user', JSON.stringify(data.data.user));

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      if(data.data.user.role === 'seller') {
        navigate('/');
        window.location.reload();
      }
    } catch (error: any) {
      setError(error.message);
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const onLoginSuccess = (response: any) => {
    setAccessToken(response.access_token);

    // Send the access token to your backend for validation and user creation (if necessary)
    fetch('/api/google/token', {
      body: JSON.stringify({ accessToken }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Store the received token (e.g., JWT) in local storage (if applicable)
        localStorage.setItem('authToken', data.token);
        // Handle successful authentication (e.g., redirect to protected routes)
      })
      .catch((error) => {
        console.error('Error sending token to backend:', error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-leftPart">
        <div className="login-intro">
          <img src="/images/logo.png" alt="Login illustration" />
          <h1>Welcome Back!</h1>
          <p className="p-cred">Please enter your credential</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              id="email"
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          </div>
          <div className="rememberPart">
            <label>
              <input
                type="checkbox"
                className="filled-in"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <span>Remember me</span>
            </label>
            <p className="login-links">
              <a href="/reset-password">Forgot Password?</a>
            </p>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'LOGIN...' : 'LOGIN'}
          </button>
        </form>
        <p className="text-center m-9 font-semi-bold">
          Or Continue with Google
        </p>
        <GoogleLogin onSuccess={onLoginSuccess} />
        <p className="text-center m-9 font-semi-bold">
          Don’t have an account?{' '}
          <a href="/signup" className="login-links">
            Sign Up
          </a>
        </p>
      </div>
      <div className="login-rightPart">
        <img src="/images/login-illustration.png" alt="Login illustration" />
        <p>Discover Amazing Deals & Exclusive Offers! </p>
        <p className="p-text">
          Looking for the best products at unbeatable prices? You’re in the
          right place! We bring you a curated selection of top-quality items,
          from the latest fashion that trends to cutting-edge electronics, all
          at prices you’ll love.
        </p>
      </div>
    </div>
  );
}

export default Login;
