
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function MyClaims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await API.get("/claims/myclaims", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setClaims(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Unable to load your claims."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  const pendingCount = claims.filter(
    (claim) => claim.status === "pending"
  ).length;

  const approvedCount = claims.filter(
    (claim) => claim.status === "approved"
  ).length;

  const rejectedCount = claims.filter(
    (claim) => claim.status === "rejected"
  ).length;

  return (
    <div>
      <Navbar />

      <section className="claims-section">
        <div className="claims-heading">
          <span className="hero-tag">TRACK YOUR REQUESTS</span>
          <h1>My Claims</h1>
          <p>Check the status of your submitted item claims.</p>
        </div>

        <div className="claims-summary">
          <div className="summary-card">
            <h2>{claims.length}</h2>
            <p>Total Claims</p>
          </div>

          <div className="summary-card">
            <h2>{pendingCount}</h2>
            <p>Pending</p>
          </div>

          <div className="summary-card">
            <h2>{approvedCount}</h2>
            <p>Approved</p>
          </div>

          <div className="summary-card">
            <h2>{rejectedCount}</h2>
            <p>Rejected</p>
          </div>
        </div>

        <div className="claims-list">
          <h2>Your Submitted Claims</h2>

          {loading && <p>Loading your claims...</p>}

          {error && <p>{error}</p>}

          {!loading && !error && claims.length === 0 && (
            <p>You haven't submitted any claims yet.</p>
          )}

          {!loading && !error && claims.map((claim) => (
            <div className="claim-card" key={claim._id}>
              <div>
                <h3>
                  {claim.item?.title || "Item unavailable"}
                </h3>

                <p>
                  Category: {claim.item?.category || "N/A"}
                </p>

                <p>
                  Location: {claim.item?.location || "N/A"}
                </p>

                <p>
                  Claim Date:{" "}
                  {new Date(claim.createdAt).toLocaleDateString("en-IN")}
                </p>

                <p>
                  Proof: {claim.proof}
                </p>
              </div>

              <span className={`claim-status ${claim.status}`}>
                {claim.status.charAt(0).toUpperCase() +
                  claim.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MyClaims;
