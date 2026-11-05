
import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import SearchBar from "../components/SearchBar";
import API from "../services/api";

function Dashboard() {

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch items from MongoDB
  const fetchItems = useCallback(async () => {
    try {
      const response = await API.get("/items");
      setItems(response.data);
      setError("");
    } catch (err) {
      setError("Unable to load items. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();

    // Refresh items after deletion
    const handleItemsChanged = () => {
      fetchItems();
    };

    window.addEventListener("itemsChanged", handleItemsChanged);

    return () => {
      window.removeEventListener("itemsChanged", handleItemsChanged);
    };
  }, [fetchItems]);

  // Search and filter items
  const filteredItems = items.filter((item) => {

    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      item.status === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <Navbar />

      <section className="dashboard">

        <div className="dashboard-heading">
          <span className="hero-tag">FINDORA COMMUNITY</span>

          <h1>Explore Lost & Found Items</h1>

          <p>
            Search for your missing belongings or help
            someone find their lost items.
          </p>
        </div>

        <div className="dashboard-actions">
          <a href="/report-lost" className="primary-btn">
            + Report Lost Item
          </a>

          <a href="/report-found" className="secondary-btn">
            + Report Found Item
          </a>
        </div>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <div className="filter-buttons">

          {["All", "Lost", "Found"].map((status) => (

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

        <div className="dashboard-results">

          <h2>Available Items</h2>

          <p>
            {loading ? "Loading..." : `${filteredItems.length} items found`}
          </p>

        </div>

        <div className="dashboard-grid">

          {loading && <p>Loading items...</p>}

          {error && (
            <p className="no-items">{error}</p>
          )}

          {!loading && !error && filteredItems.length > 0 && (
            filteredItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
              />
            ))
          )}

          {!loading && !error && filteredItems.length === 0 && (
            <p className="no-items">
              No items found. Try another search.
            </p>
          )}

        </div>

      </section>
    </div>
  );
}

export default Dashboard;
