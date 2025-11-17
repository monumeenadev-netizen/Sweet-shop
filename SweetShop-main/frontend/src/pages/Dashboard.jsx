import { useState, useEffect } from "react";
import { sweetsAPI } from "../utils/api";
import { useCart } from "../hooks/useCart";
import SweetCard from "../components/SweetCard";
import SearchBar from "../components/SearchBar";

const Dashboard = ({ user }) => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const { data } = await sweetsAPI.getAllSweets();
      setSweets(data.sweets);
      setError("");
    } catch (err) {
      setError("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (filters) => {
    try {
      setLoading(true);
      if (Object.values(filters).every((v) => v === undefined)) {
        await fetchSweets();
      } else {
        const { data } = await sweetsAPI.searchSweets(filters);
        setSweets(data.sweets);
      }
    } catch {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (sweetId, quantity) => {
    const success = await addToCart(sweetId, quantity);
    if (success) {
      setSuccessMessage("🎉 Added to cart!");
      setTimeout(() => setSuccessMessage(""), 2500);
    } else {
      setError("Failed to add to cart");
    }
  };

  const handleEdit = (sweet) => {
    window.location.href = `/admin?edit=${sweet._id}`;
  };

  const handleDelete = async (sweetId) => {
    if (window.confirm("Are you sure you want to delete this sweet?")) {
      try {
        await sweetsAPI.deleteSweet(sweetId);
        setSuccessMessage("❁ Sweet deleted!");
        fetchSweets();
      } catch (err) {
        setError("Failed to delete sweet");
      }
    }
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
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: "800",
              color: "#3E2F1D",
              letterSpacing: "-1px",
            }}
          >
            ❁ Our Signature Collection
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "#5A4733",
              marginTop: "10px",
              fontWeight: "600",
            }}
          >
            Handcrafted sweets made with purity, tradition & premium ingredients
          </p>
        </div>

        {/* ALERTS */}
        {error && (
          <div
            style={{
              background: "#ffdddd",
              padding: "12px 18px",
              borderRadius: "10px",
              color: "#b13b3b",
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
              padding: "12px 18px",
              borderRadius: "10px",
              color: "#8A672D",
              marginBottom: "20px",
              fontWeight: "600",
            }}
          >
            {successMessage}
          </div>
        )}

        {/* SEARCH BAR */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "25px",
            border: "2px solid #E8DCC5",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
          }}
        >
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* SWEETS GRID */}
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <span
              style={{
                marginTop: "12px",
                color: "#5A4733",
                fontWeight: "600",
              }}
            >
              Loading our delicious collection...
            </span>
          </div>
        ) : sweets.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#5A4733",
            }}
          >
            <p style={{ fontSize: "18px", fontWeight: "700" }}>
              No sweets available at the moment
            </p>
          </div>
        ) : (
          <div className="grid grid-4">
            {sweets.map((sweet) => (
              <SweetCard
                key={sweet._id}
                sweet={sweet}
                isAdmin={user?.role === "admin"}
                onAddToCart={handleAddToCart}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
