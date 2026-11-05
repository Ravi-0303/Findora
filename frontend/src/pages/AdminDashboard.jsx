
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function AdminDashboard() {
  const [claims, setClaims] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchClaims = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/claims", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setClaims(response.data);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load claims. Please login as admin."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  async function updateStatus(id, newStatus) {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/claims/${id}`,
        { status: newStatus.toLowerCase() },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(`Claim ${newStatus} successfully!`);

      await fetchClaims();

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Unable to update claim status."
      );
    }
  }

  const pendingCount = claims.filter(
    (c) => c.status === "pending"
  ).length;

  const approvedCount = claims.filter(
    (c) => c.status === "approved"
  ).length;

  const rejectedCount = claims.filter(
    (c) => c.status === "rejected"
  ).length;

  const filteredClaims = claims.filter((claim) =>
    filter === "All" ||
    claim.status === filter.toLowerCase()
  );

  return (
    <div>
      <Navbar />

      <section className="admin-section">

        <div className="admin-heading">
          <span className="hero-tag">ADMIN PANEL</span>
          <h1>Admin Dashboard</h1>
          <p>Manage reported items and student claim requests.</p>
        </div>

        <div className="admin-summary">

          <div className="admin-card">
            <h2>{claims.length}</h2>
            <p>Total Claims</p>
          </div>

          <div className="admin-card">
            <h2>{pendingCount}</h2>
            <p>Pending Claims</p>
          </div>

          <div className="admin-card">
            <h2>{approvedCount}</h2>
            <p>Approved Claims</p>
          </div>

          <div className="admin-card">
            <h2>{rejectedCount}</h2>
            <p>Rejected Claims</p>
          </div>

        </div>

        <div className="admin-claims">

          <div className="admin-claims-heading">
            <h2>Manage Claim Requests</h2>

            <button
              className="filter-btn"
              onClick={fetchClaims}
              disabled={loading}
            >
              {loading ? "Refreshing..." : "↻ Refresh"}
            </button>
          </div>

          <div className="admin-filters">
            {["All", "Pending", "Approved", "Rejected"].map((status) => (
              <button
                key={status}
                className={
                  filter === status
                    ? "filter-btn active"
                    : "filter-btn"
                }
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>

          {loading && <p>Loading claims...</p>}

          {error && <p>{error}</p>}

          {!loading && !error && filteredClaims.map((claim) => (
            <div className="admin-claim-card" key={claim._id}>

              <div className="admin-claim-info">

                <h3>
                  {claim.item?.title || "Item unavailable"}
                </h3>

                <p>
                  Student: {claim.claimedBy?.name || "Unknown"}
                </p>

                <p>
                  Email: {claim.claimedBy?.email || "N/A"}
                </p>

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
                  Proof of Ownership: {claim.proof}
                </p>

                <span className={`claim-status ${claim.status}`}>
                  {claim.status.charAt(0).toUpperCase() +
                    claim.status.slice(1)}
                </span>

              </div>

              {claim.status === "pending" && (
                <div className="admin-actions">

                  <button
                    className="approve-btn"
                    onClick={() => updateStatus(claim._id, "approved")}
                  >
                    Approve
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() => updateStatus(claim._id, "rejected")}
                  >
                    Reject
                  </button>

                </div>
              )}

            </div>
          ))}

          {!loading && !error && filteredClaims.length === 0 && (
            <p>No claim requests found.</p>
          )}

        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
