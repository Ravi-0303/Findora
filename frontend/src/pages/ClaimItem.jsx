
import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function ClaimItem() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;

  const [proof, setProof] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/claims",
        {
          itemId: item._id,
          proof: proof
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Your claim request has been submitted successfully!");
      navigate("/my-claims");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Unable to submit claim. Please login and try again."
      );
    }
  }

  if (!item) {
    return (
      <div>
        <Navbar />
        <section className="item-details">
          <h2>Item information not available.</h2>
          <Link to="/dashboard">Back to Dashboard</Link>
        </section>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <section className="report-section">
        <div className="report-heading">
          <span className="hero-tag">RECOVER YOUR BELONGINGS</span>
          <h1>Claim This Item</h1>
          <p>Provide information to verify that this item belongs to you.</p>
        </div>

        <form className="report-form" onSubmit={handleSubmit}>
          <h3>Item: {item.title}</h3>

          <label>Proof of Ownership</label>
          <textarea
            value={proof}
            onChange={(e) => setProof(e.target.value)}
            placeholder="Mention any unique details that can identify the item..."
            required
          />

          <button type="submit" className="submit-report-btn">
            Submit Claim
          </button>
        </form>
      </section>
    </div>
  );
}

export default ClaimItem;
