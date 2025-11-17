import { useState, useEffect } from "react";
import { sweetsAPI } from "../utils/api";

const AdminPanel = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    image: "",
  });

  // Optional: Update categories later to match home theme (Kaju Katli etc)
  const categories = [
    "Gulab Jamun",
    "Rasgulla",
    "Jalebi",
    "Barfi",
    "Laddu",
    "Kheer",
    "Halwa",
    "Fafda",
    "Other",
  ];

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const { data } = await sweetsAPI.getAllSweets();
      setSweets(data.sweets);
    } catch {
      setError("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (parseFloat(formData.quantity) < 0) {
      setError("Quantity cannot be negative");
      return;
    }

    const submitData = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      image: formData.image || "",
    };

    try {
      if (editId) {
        await sweetsAPI.updateSweet(editId, submitData);
        setSuccessMessage("Sweet updated successfully!");
      } else {
        await sweetsAPI.createSweet(submitData);
        setSuccessMessage("Sweet created successfully!");
      }
      setFormData({
        name: "",
        category: "",
        price: "",
        quantity: "",
        image: "",
      });
      setEditId(null);
      setShowModal(false);
      await fetchSweets();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save sweet");
    }
  };

  const handleEdit = (sweet) => {
    setFormData({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
      image: sweet.image || "",
    });
    setEditId(sweet._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure?")) {
      try {
        await sweetsAPI.deleteSweet(id);
        setSuccessMessage("Sweet deleted successfully!");
        await fetchSweets();
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to delete sweet");
      }
    }
  };

  const handleRestock = async (id) => {
    const quantity = prompt("Enter restock quantity:");
    if (quantity && parseInt(quantity) >= 0) {
      try {
        await sweetsAPI.restockSweet(id, parseInt(quantity));
        setSuccessMessage("Restock successful!");
        await fetchSweets();
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to restock");
      }
    } else if (quantity) {
      setError("Quantity cannot be negative");
    }
  };

  const filteredSweets = sweets.filter((sweet) => {
    if (filters.category && sweet.category !== filters.category) return false;
    if (filters.minPrice && sweet.price < parseFloat(filters.minPrice))
      return false;
    if (filters.maxPrice && sweet.price > parseFloat(filters.maxPrice))
      return false;
    return true;
  });

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData({ name: "", category: "", price: "", quantity: "", image: "" });
    setError("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FFF9F2, #FFF4E6)",
        paddingTop: "80px",
        paddingBottom: "40px",
      }}
    >
      <div className="container">
        <h1
          className="section-title"
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "36px",
            color: "#3E2F1D",
            fontWeight: "800",
            letterSpacing: "-1px",
          }}
        >
          ❁ Inventory Management
        </h1>

        {/* ALERTS */}
        {error && (
          <div
            style={{
              background: "#ffdddd",
              color: "#b13b3b",
              padding: "12px 18px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontWeight: "600",
            }}
          >
            {error}
          </div>
        )}

        {successMessage && (
          <div
            style={{
              background: "#e7d7b8",
              color: "#8A672D",
              padding: "12px 18px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontWeight: "600",
            }}
          >
            {successMessage}
          </div>
        )}

        {/* ADD BUTTON */}
        <div style={{ marginBottom: "32px", textAlign: "center" }}>
          <button
            onClick={() => setShowModal(true)}
            style={{
              background: "linear-gradient(135deg, #C59B5F, #B88646)",
              border: "none",
              color: "white",
              padding: "14px 34px",
              borderRadius: "50px",
              fontWeight: "700",
              fontSize: "16px",
              boxShadow: "0 6px 18px rgba(184,134,70,0.3)",
              cursor: "pointer",
            }}
          >
            + Add New Sweet
          </button>
        </div>

        {/* MODAL */}
        {showModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "20px",
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "18px",
                padding: "32px",
                maxWidth: "520px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
                border: "2px solid #E8DCC5",
              }}
            >
              {/* HEADER */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "24px",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "24px",
                    fontWeight: "800",
                    color: "#3E2F1D",
                  }}
                >
                  {editId ? "Edit Sweet" : "Add New Sweet"}
                </h2>

                <button
                  onClick={closeModal}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "30px",
                    cursor: "pointer",
                    color: "#777",
                  }}
                >
                  ×
                </button>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" style={{ color: "#3E2F1D" }}>
                    Sweet Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Royal Kaju Katli"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="form-control"
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #D8CBB3",
                      padding: "10px",
                    }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: "#3E2F1D" }}>
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                    className="form-control"
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #D8CBB3",
                      padding: "10px",
                    }}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <div className="form-group">
                    <label className="form-label" style={{ color: "#3E2F1D" }}>
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      placeholder="0.00"
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="form-control"
                      style={{
                        borderRadius: "10px",
                        border: "1px solid #D8CBB3",
                        padding: "10px",
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: "#3E2F1D" }}>
                      Quantity *
                    </label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: e.target.value })
                      }
                      required
                      min="0"
                      className="form-control"
                      style={{
                        borderRadius: "10px",
                        border: "1px solid #D8CBB3",
                        padding: "10px",
                      }}
                    />
                  </div>
                </div>

                {/* IMAGE URL */}
                <div className="form-group" style={{ marginTop: "12px" }}>
                  <label className="form-label" style={{ color: "#3E2F1D" }}>
                    Image URL (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="https://example.com/photo.jpg"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="form-control"
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #D8CBB3",
                      padding: "10px",
                    }}
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="preview"
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        marginTop: "12px",
                        borderRadius: "12px",
                      }}
                    />
                  )}
                </div>

                {/* BUTTONS */}
                <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      background: "linear-gradient(135deg, #C59B5F, #B88646)",
                      border: "none",
                      color: "white",
                      padding: "12px",
                      borderRadius: "12px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    {editId ? "Update Sweet" : "Create Sweet"}
                  </button>

                  <button
                    type="button"
                    onClick={closeModal}
                    style={{
                      flex: 1,
                      background: "#D8CBB3",
                      border: "none",
                      color: "#3E2F1D",
                      padding: "12px",
                      borderRadius: "12px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* FILTER PANEL */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            marginBottom: "32px",
            boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
            border: "2px solid #E8DCC5",
          }}
        >
          <h3
            style={{
              marginBottom: "16px",
              fontSize: "20px",
              fontWeight: "800",
              color: "#3E2F1D",
            }}
          >
            ❁ Filter Inventory
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            <div>
              <label className="form-label">Category</label>
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
                className="form-control"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #D8CBB3",
                  padding: "10px",
                }}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Min Price (₹)</label>
              <input
                type="number"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: e.target.value })
                }
                min="0"
                className="form-control"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #D8CBB3",
                  padding: "10px",
                }}
              />
            </div>

            <div>
              <label className="form-label">Max Price (₹)</label>
              <input
                type="number"
                placeholder="1000"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: e.target.value })
                }
                min="0"
                className="form-control"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #D8CBB3",
                  padding: "10px",
                }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <button
                onClick={() =>
                  setFilters({ category: "", minPrice: "", maxPrice: "" })
                }
                style={{
                  width: "100%",
                  background: "#D8CBB3",
                  border: "none",
                  color: "#3E2F1D",
                  padding: "10px",
                  fontWeight: "700",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* SWEETS GRID */}
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : filteredSweets.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#3E2F1D",
              }}
            >
              No sweets found matching your filters
            </p>
          </div>
        ) : (
          <div className="grid grid-4">
            {filteredSweets.map((sweet) => (
              <div
                key={sweet._id}
                style={{
                  background: "white",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                  border: "2px solid #E8DCC5",
                  transition: "0.3s ease",
                }}
              >
                {/* IMAGE */}
                {sweet.image ? (
                  <img
                    src={sweet.image}
                    alt={sweet.name}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "180px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "48px",
                      background:
                        "linear-gradient(135deg, #F9E7C6, #EFD8B4)",
                      color: "#B88646",
                    }}
                  >
                    ❁
                  </div>
                )}

                {/* DETAILS */}
                <div style={{ padding: "16px" }}>
                  <h3
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "18px",
                      fontWeight: "800",
                      color: "#3E2F1D",
                    }}
                  >
                    {sweet.name}
                  </h3>

                  <p
                    style={{
                      margin: "0 0 8px 0",
                      color: "#5A4733",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {sweet.category}
                  </p>

                  <p
                    style={{
                      margin: "0 0 12px 0",
                      fontSize: "20px",
                      fontWeight: "800",
                      color: "#B88646",
                    }}
                  >
                    ₹{sweet.price.toFixed(2)}
                  </p>

                  <p
                    style={{
                      margin: "0 0 16px 0",
                      fontSize: "14px",
                      color: "#5A4733",
                      fontWeight: "600",
                    }}
                  >
                    Stock: {sweet.quantity}
                  </p>

                  {/* ACTION BUTTONS */}
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      onClick={() => handleEdit(sweet)}
                      style={{
                        flex: 1,
                        background: "#D8CBB3",
                        border: "none",
                        color: "#3E2F1D",
                        padding: "10px",
                        borderRadius: "10px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleRestock(sweet._id)}
                      style={{
                        flex: 1,
                        background:
                          "linear-gradient(135deg, #C59B5F, #B88646)",
                        border: "none",
                        color: "white",
                        padding: "10px",
                        borderRadius: "10px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      Restock
                    </button>

                    <button
                      onClick={() => handleDelete(sweet._id)}
                      style={{
                        flex: 1,
                        background: "#B13B3B",
                        border: "none",
                        color: "white",
                        padding: "10px",
                        borderRadius: "10px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
