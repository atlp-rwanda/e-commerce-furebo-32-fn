import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

    try {
      const response = await fetch(
        'https://e-commerce-furebo-32-bn-1.onrender.com/api/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message ||
            'Invalid email or password, Please check your credentials.',
        );
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      navigate('/dashboard');
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

  const googleLoginAction = async () => {
    try {
      const response = await fetch(
        'https://e-commerce-furebo-32-bn-1.onrender.com/api/google/auth',
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        return;
      }
      throw new Error(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-leftPart">
        <div className="login-intro">
          <img src="/images/logo.png" alt="Login illustration" />
          <h1>Welcome Back!</h1>
          <p>Please enter your credential</p>
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
          <button type="submit" className="btn">
            Login
          </button>
        </form>
        <p className="text-center my-3 font-thin">Or Continue with Google</p>
        <button
          className="border-blue-500 w-full border-2 rounded-lg p-2 "
          onClick={() => googleLoginAction()}
        >
          <i className="fa-brands fa-google"></i>
        </button>
        <p className="login-links">
          Don’t have an account? <a href="/sign-up">Sign Up</a>
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
