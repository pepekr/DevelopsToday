import React, { useState } from 'react';
import { useLoginForm } from "../hooks/useLoginHook"
import "../styles/login.css";
import { useNavigate } from 'react-router';

export default function Login() {
  const [loginError, setLoginError] = useState<string>("");
  const navigate = useNavigate();

  const {
    formData,
    errors,
    handleInputChange,
    handleSubmit,
  } = useLoginForm();

  const onSubmit = async (data: any) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/login`, {
      headers: {
        "Content-type": "application/json",
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      setLoginError(error.message || "Login failed");
    } else {
      setIsAuthenticated(true);
      navigate('/')
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button type="submit">Login</button>
        <button onClick= {()=>navigate("/signin")} type="submit">
        Sign up
        </button>
        {loginError && <span className="error">{loginError}</span>}
      </form>
    </div>
  );
}
