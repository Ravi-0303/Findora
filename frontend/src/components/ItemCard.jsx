
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function ItemCard({ item }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?._id || user?.id;
  const reportedById = item.reportedBy?._id || item.reportedBy;

  const isOwner =
    userId &&
    reportedById &&
    userId.toString() === reportedById.toString();

  const isAdmin = user?.role === "admin";

  // Build the correct image URL
  const imageUrl = item.image
    ? item.image.startsWith("http")
      ? item.image
      : `http://localhost:5000${item.image}`
    : "";

  function handleViewDetails() {
    navigate("/item-details", {
      state: { item: item }
    });
  }

  function handleEdit() {
    navigate("/edit-item", {
      state: { item: item }
    });
  }

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/items/${item._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Item deleted successfully!");

      window.dispatchEvent(new Event("itemsChanged"));

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Unable to delete item."
      );
    }
  }

  return (
    <div className="dashboard-item-card">

      <div className="dashboard-item-image">
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

      <button
        className="view-btn"
        onClick={handleViewDetails}
      >
        View Details →
      </button>

      {(isOwner || isAdmin) && (
        <div className="item-management-actions">

          <button
            className="edit-item-btn"
            onClick={handleEdit}
          >
            Edit
          </button>

          <button
            className="delete-item-btn"
            onClick={handleDelete}
          >
            Delete
          </button>

        </div>
      )}

    </div>
  );
}

export default ItemCard;
