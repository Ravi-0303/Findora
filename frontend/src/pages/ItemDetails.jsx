
import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function ItemDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const [item, setItem] = useState(location.state?.item || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const itemId =
          location.state?.item?._id ||
          window.location.pathname.split("/").pop();

        const response = await API.get(`/items/${itemId}`);
        setItem(response.data);
      } catch (err) {
        setError("Unable to load item details.");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [location.state]);

  function handleClaim() {
    navigate("/claim-item", {
      state: { item: item }
    });
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <section className="item-details">
          <h2>Loading item details...</h2>
        </section>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div>
        <Navbar />
        <section className="item-details">
          <h2>{error || "Item details not available"}</h2>
          <Link to="/dashboard" className="primary-btn">
            Back to Dashboard
          </Link>
        </section>
      </div>
    );
  }

  // Build the correct backend image URL
  const imageUrl = item.image
  ? item.image.startsWith("http")
    ? item.image
    : `https://findora-portal.onrender.com${item.image}`
  : "";

  return (
    <div>
      <Navbar />

      <section className="item-details">
        <div className="details-card">

          <div className="details-image">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            ) : (
              "📦"
            )}
          </div>

          <span className={
            item.status === "lost" ? "lost-status" : "found-status"
          }>
            {item.status.toUpperCase()}
          </span>

          <h1>{item.title}</h1>

          <div className="details-info">
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(item.date).toLocaleDateString("en-IN")}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {item.description || "No description provided."}
            </p>
          </div>

          {item.status === "found" && (
            <button
              className="submit-report-btn"
              onClick={handleClaim}
            >
              Claim This Item
            </button>
          )}

          <Link to="/dashboard" className="back-link">
            ← Back to Dashboard
          </Link>

        </div>
      </section>
    </div>
  );
}

export default ItemDetails;
