
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user") || "null")
  );

  useEffect(() => {
    const updateUser = () => {
      setUser(JSON.parse(localStorage.getItem("user") || "null"));
    };

    window.addEventListener("userChanged", updateUser);

    return () => {
      window.removeEventListener("userChanged", updateUser);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    window.dispatchEvent(new Event("userChanged"));

    navigate("/login");
  }

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        <span className="logo-icon">F</span>
        Findora
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <a href="/#recent-items">Browse Items</a>

        <a href="/#how-it-works">How It Works</a>
      </div>

      <div className="nav-buttons">

        {!user ? (
          <>
            <Link to="/login" className="login-btn">
              Log In
            </Link>

            <Link to="/register" className="signup-btn">
              Get Started
            </Link>
          </>
        ) : (
          <>
            {user.role === "admin" ? (
              <Link
                to="/admin-dashboard"
                className="dashboard-btn"
              >
                Admin Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="dashboard-btn"
                >
                  Dashboard
                </Link>

                <Link to="/my-claims" className="dashboard-btn">
                  My Claims
                </Link>
              </>
            )}

            <span className="welcome-text">
              Welcome, {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;
