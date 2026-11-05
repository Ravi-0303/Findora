
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function ReportFound() {
  const navigate = useNavigate();

  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // Create FormData to send text and image
      const formData = new FormData();

      formData.append("title", itemName);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("date", date);
      formData.append("status", "found");

      if (image) {
        formData.append("image", image);
      }

      await API.post("/items", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Found item reported successfully!");
      window.dispatchEvent(new Event("itemsChanged"));
      navigate("/dashboard");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Unable to submit found item. Please login and try again."
      );
    }
  }

  return (
    <div>
      <Navbar />

      <section className="report-section">
        <div className="report-heading">
          <span className="hero-tag">HELP SOMEONE FIND IT</span>
          <h1>Report a Found Item</h1>
          <p>Help the owner recover their missing belongings.</p>
        </div>

        <form className="report-form" onSubmit={handleSubmit}>
          <label>Item Name</label>
          <input
            type="text"
            placeholder="Enter found item name"
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
            placeholder="Describe the item you found..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>Found Location</label>
          <input
            type="text"
            placeholder="Where did you find it?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <label>Found Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label>Contact Details</label>
          <input
            type="text"
            placeholder="Enter your phone number or email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />

          <label>Upload Item Image (Optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button type="submit" className="submit-report-btn">
            Submit Found Item
          </button>
        </form>
      </section>
    </div>
  );
}

export default ReportFound;
