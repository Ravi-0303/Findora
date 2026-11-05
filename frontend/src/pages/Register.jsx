import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await API.post("/users/register", {
        name,
        email,
        password
      });

      alert(response.data.message);

      navigate("/login");

    } catch (error) {
      alert(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <div className="auth-logo">
          <span className="logo-icon">F</span>
          <h2>Findora</h2>
        </div>

        <h1>Create Account</h1>

        <p className="auth-description">
          Join Findora and help your campus community.
        </p>

        <form onSubmit={handleRegister}>

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={6}
            required
          />

          <button type="submit" className="auth-button">
            Create Account
          </button>

        </form>

        <p className="auth-switch">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

        <Link to="/" className="back-home">
          ← Back to Home
        </Link>

      </div>

    </div>
  );
}

export default Register;