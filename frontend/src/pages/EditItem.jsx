
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function EditItem() {
  const location = useLocation();
  const navigate = useNavigate();

  const item = location.state?.item;

  const [itemName, setItemName] = useState(item?.title || "");
  const [category, setCategory] = useState(item?.category || "");
  const [description, setDescription] = useState(item?.description || "");
  const [itemLocation, setItemLocation] = useState(item?.location || "");
  const [date, setDate] = useState(
    item?.date ? new Date(item.date).toISOString().split("T")[0] : ""
  );

  if (!item) {
    return (
      <div>
        <Navbar />
        <h2>Item details not found.</h2>
        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/items/${item._id}`,
        {
          title: itemName,
          category,
          description,
          location: itemLocation,
          date
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Item updated successfully!");

      window.dispatchEvent(new Event("itemsChanged"));

      navigate("/dashboard");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Unable to update item."
      );
    }
  }

  return (
    <div>
      <Navbar />

      <section className="report-section">

        <div className="report-heading">
          <span className="hero-tag">UPDATE ITEM</span>
          <h1>Edit Item Details</h1>
          <p>Make changes to your reported item.</p>
        </div>

        <form className="report-form" onSubmit={handleSubmit}>

          <label>Item Name</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />

          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Accessories">Accessories</option>
            <option value="Bags">Bags</option>
            <option value="Documents">Documents</option>
            <option value="Others">Others</option>
          </select>

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>Location</label>
          <input
            type="text"
            value={itemLocation}
            onChange={(e) => setItemLocation(e.target.value)}
            required
          />

          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <button type="submit" className="submit-report-btn">
            Save Changes
          </button>

        </form>
      </section>
    </div>
  );
}

export default EditItem;
