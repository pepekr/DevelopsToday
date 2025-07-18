import React, { useState } from 'react';
import { useSigninForm } from "../hooks/useSignInHook"
import '../styles/signin.css';
import { useNavigate } from 'react-router';

export default function Signin() {
  const navigate = useNavigate();
  const [signinError, setSigninError] = useState<string>("");

  const {
    formData,
    errors,
    handleInputChange,
    handleSubmit,
  } = useSigninForm();

  const onSubmit = async (data: any) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/signin`, {
      headers: {
        "Content-type": "application/json",
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      setSigninError(error.message || "Signin failed");
    } else {
      navigate('/')
    }
  };

  return (
    <div className="signin-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="signin-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
          />
          {errors.email && <div className="signin-error">{errors.email}</div>}
        </div>

        <div className="signin-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="********"
          />
          {errors.password && <div className="signin-error">{errors.password}</div>}
        </div>

        <div className="signin-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmedPassword"
            value={formData.confirmedPassword}
            onChange={handleInputChange}
            placeholder="********"
          />
          {errors.confirmedPassword && <div className="signin-error">{errors.confirmedPassword}</div>}
        </div>

        <button className="signin-button" type="submit">
          Sign Up
        </button>
        <button onClick= {()=>navigate("/login")}className="signin-button" type="submit">
          Log in
        </button>
        {signinError && <div className="signin-error">{signinError}</div>}
      </form>
    </div>
  );
}
