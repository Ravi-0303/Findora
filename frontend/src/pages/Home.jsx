
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await API.get("/items");
        setItems(response.data.slice(0, 3));
      } catch (err) {
        setError("Unable to load items. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="hero" id="top">
        <div className="hero-content">
          <span className="hero-tag">
            CAMPUS LOST & FOUND PLATFORM
          </span>

          <h1>
            Lost something?
            <br />
            <span>We'll help you find it.</span>
          </h1>

          <p>
            Findora connects students who have lost their
            belongings with those who have found them.
            Your lost items deserve a second chance!
          </p>

          <div className="hero-buttons">
            <a href="#recent-items" className="primary-btn">
              Explore Items →
            </a>

            <a href="#how-it-works" className="secondary-btn">
              How It Works
            </a>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="hero-visual">
          <div className="visual-circle"></div>

          <div className="floating-card">
            <div className="visual-icon">🎒</div>
            <h3>Lost & Found</h3>
            <p>Your belongings matter.</p>
            <span className="found-label">
              Making campus life easier
            </span>
          </div>

          <div className="small-card">
            <span>✓</span>
            Item recovered!
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats">
        <div className="stat-box">
          <h2>100+</h2>
          <p>Items Reported</p>
        </div>

        <div className="stat-box">
          <h2>75+</h2>
          <p>Items Recovered</p>
        </div>

        <div className="stat-box">
          <h2>50+</h2>
          <p>Active Students</p>
        </div>
      </section>

      {/* Recent Items Section */}
      <section className="recent-section" id="recent-items">
        <div className="section-heading">
          <span>RECENT UPDATES</span>
          <h2>Recently Reported Items</h2>
          <p>
            Check out the latest lost and found items
            reported on your campus.
          </p>
        </div>

        <div className="item-container">

          {loading && <p>Loading items...</p>}

          {error && <p>{error}</p>}

          {!loading && !error && items.length === 0 && (
            <p>No items have been reported yet.</p>
          )}

          {!loading && !error && items.map((item) => {

            // Build the correct backend image URL
            const imageUrl = item.image
              ? item.image.startsWith("http")
                ? item.image
                : `http://localhost:5000${item.image}`
              : "";

            return (
              <div className="item-card" key={item._id}>

                <div className="item-image">
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

                <span
                  className={
                    item.status === "lost"
                      ? "lost-status"
                      : "found-status"
                  }
                >
                  {item.status.toUpperCase()}
                </span>

                <h3>{item.title}</h3>

                <p>Category: {item.category}</p>

                <p>Location: {item.location}</p>

                <p>
                  Date: {new Date(item.date).toLocaleDateString("en-IN")}
                </p>

                <Link to={`/item/${item._id}`}>
                  View Details
                </Link>

              </div>
            );
          })}

        </div>
      </section>

      {/* How It Works */}
      <section className="how-section" id="how-it-works">
        <div className="section-heading">
          <span>SIMPLE PROCESS</span>
          <h2>How Findora Works</h2>
          <p>
            Recovering your belongings is just a few
            simple steps away.
          </p>
        </div>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-icon">📝</div>
            <h3>Report an Item</h3>
            <p>
              Report your lost item or upload
              details of an item you found.
            </p>
          </div>

          <div className="step-card">
            <div className="step-icon">🔍</div>
            <h3>Search Items</h3>
            <p>
              Browse reported items and
              find belongings matching yours.
            </p>
          </div>

          <div className="step-card">
            <div className="step-icon">🤝</div>
            <h3>Recover Belongings</h3>
            <p>
              Submit a claim and get your
              belongings back after verification.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
