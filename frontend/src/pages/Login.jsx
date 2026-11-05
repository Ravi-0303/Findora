import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/users/login", {
        email,
        password
      });

      // Store login information
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      window.dispatchEvent(new Event("userChanged"));

      alert("Login successful!");

      // Redirect based on user role
      if (response.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      alert(
        error.response?.data?.message || "Login failed. Please try again."
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

        <h1>Welcome Back!</h1>

        <p className="auth-description">
          Login to find your lost belongings.
        </p>

        <form onSubmit={handleLogin}>

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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-button">
            Login
          </button>

        </form>

        <p className="auth-switch">
          Don't have an account?
          <Link to="/register"> Create Account</Link>
        </p>

        <Link to="/" className="back-home">
          ← Back to Home
        </Link>

      </div>
    </div>
  );
}

export default Login;