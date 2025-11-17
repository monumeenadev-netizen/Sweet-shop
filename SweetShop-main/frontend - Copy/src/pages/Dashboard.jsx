import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sweetsAPI } from "../utils/api";
import { useCart } from "../hooks/useCart";
import { ShoppingCart, Star, Search, Filter, X } from "lucide-react";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const { addToCart } = useCart();

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["All", "Gulab Jamun", "Rasgulla", "Jalebi", "Barfi", "Laddu", "Kheer", "Halwa", "Fafda", "Other"];

  useEffect(() => {
    fetchSweets();
  }, []);

  useEffect(() => {
    filterSweets();
  }, [sweets, searchTerm, selectedCategory, priceRange]);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const { data } = await sweetsAPI.getAllSweets();
      setSweets(data.sweets);
      setFilteredSweets(data.sweets);
      setError("");
    } catch (err) {
      setError("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  const filterSweets = () => {
    let filtered = [...sweets];

    if (searchTerm) {
      filtered = filtered.filter(sweet =>
        sweet.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(sweet => sweet.category === selectedCategory);
    }

    if (priceRange.min) {
      filtered = filtered.filter(sweet => sweet.price >= parseFloat(priceRange.min));
    }

    if (priceRange.max) {
      filtered = filtered.filter(sweet => sweet.price <= parseFloat(priceRange.max));
    }

    setFilteredSweets(filtered);
  };

  const handleAddToCart = async (sweetId, quantity) => {
    const success = await addToCart(sweetId, quantity);
    if (success) {
      setSuccessMessage("🎉 Added to cart!");
      setTimeout(() => setSuccessMessage(""), 2500);
    } else {
      setError("Failed to add to cart");
      setTimeout(() => setError(""), 2500);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setPriceRange({ min: "", max: "" });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #FFF8F3 0%, #FFF0F5 50%, #F5F0FF 100%)",
      paddingTop: "2rem",
      paddingBottom: "4rem"
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "3rem", textAlign: "center" }}>
          <h1 style={{
            fontSize: "48px",
            fontWeight: "800",
            background: "linear-gradient(135deg, #2D1B4E, #FF6B9D)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "0.5rem"
          }}>
            Our Sweet Collection
          </h1>
          <p style={{ fontSize: "18px", color: "#666" }}>
            Discover handcrafted delights made with premium ingredients
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div style={{
            background: "linear-gradient(135deg, #FFE5E5, #FFD0D0)",
            padding: "1rem 1.5rem",
            borderRadius: "16px",
            color: "#C62828",
            marginBottom: "1.5rem",
            fontWeight: "600",
            boxShadow: "0 4px 12px rgba(198, 40, 40, 0.1)"
          }}>
            {error}
          </div>
        )}

        {successMessage && (
          <div style={{
            background: "linear-gradient(135deg, #E8F5E9, #C8E6C9)",
            padding: "1rem 1.5rem",
            borderRadius: "16px",
            color: "#2E7D32",
            marginBottom: "1.5rem",
            fontWeight: "600",
            boxShadow: "0 4px 12px rgba(46, 125, 50, 0.1)"
          }}>
            {successMessage}
          </div>
        )}

        {/* Search and Filter Bar */}
        <div style={{
          background: "white",
          borderRadius: "20px",
          padding: "1.5rem",
          marginBottom: "2rem",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)"
        }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
            {/* Search */}
            <div style={{ flex: "1 1 300px", position: "relative" }}>
              <Search style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#999" }} size={20} />
              <input
                type="text"
                placeholder="Search for sweets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem 0.75rem 3rem",
                  border: "2px solid #f0f0f0",
                  borderRadius: "12px",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.3s"
                }}
                onFocus={(e) => e.target.style.borderColor = "#FF6B9D"}
                onBlur={(e) => e.target.style.borderColor = "#f0f0f0"}
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: "0.75rem 1rem",
                border: "2px solid #f0f0f0",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: "600",
                outline: "none",
                cursor: "pointer",
                minWidth: "150px"
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                background: showFilters ? "linear-gradient(135deg, #FF6B9D, #FFB347)" : "white",
                border: "2px solid #FF6B9D",
                color: showFilters ? "white" : "#FF6B9D",
                padding: "0.75rem 1.5rem",
                borderRadius: "12px",
                fontWeight: "700",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.3s"
              }}
            >
              <Filter size={18} />
              Filters
            </button>

            {/* Clear Filters */}
            {(searchTerm || selectedCategory !== "All" || priceRange.min || priceRange.max) && (
              <button
                onClick={clearFilters}
                style={{
                  background: "transparent",
                  border: "2px solid #ddd",
                  color: "#666",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "12px",
                  fontWeight: "700",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <X size={18} />
                Clear
              </button>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div style={{
              marginTop: "1.5rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid #f0f0f0",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem"
            }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#666", fontSize: "14px" }}>
                  Min Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #f0f0f0",
                    borderRadius: "12px",
                    fontSize: "15px",
                    outline: "none"
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#666", fontSize: "14px" }}>
                  Max Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="1000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #f0f0f0",
                    borderRadius: "12px",
                    fontSize: "15px",
                    outline: "none"
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: "1.5rem", color: "#666", fontSize: "15px", fontWeight: "600" }}>
          Showing {filteredSweets.length} of {sweets.length} products
        </div>

        {/* Products Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <div className="spinner"></div>
            <p style={{ marginTop: "1rem", color: "#666" }}>Loading delicious sweets...</p>
          </div>
        ) : filteredSweets.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "4rem",
            background: "white",
            borderRadius: "20px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)"
          }}>
            <div style={{ fontSize: "64px", marginBottom: "1rem" }}>🔍</div>
            <h3 style={{ fontSize: "24px", fontWeight: "700", color: "#333", marginBottom: "0.5rem" }}>
              No sweets found
            </h3>
            <p style={{ color: "#666" }}>Try adjusting your filters or search terms</p>
            <button
              onClick={clearFilters}
              style={{
                marginTop: "1.5rem",
                background: "linear-gradient(135deg, #FF6B9D, #FFB347)",
                border: "none",
                padding: "1rem 2rem",
                borderRadius: "12px",
                color: "white",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "2rem"
          }}>
            {filteredSweets.map(sweet => (
              <div
                key={sweet._id}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: hoveredCard === sweet._id 
                    ? "0 20px 60px rgba(255, 107, 157, 0.2)"
                    : "0 8px 24px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: hoveredCard === sweet._id ? "translateY(-12px)" : "translateY(0)",
                  cursor: "pointer"
                }}
                onMouseEnter={() => setHoveredCard(sweet._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image */}
                <div 
                  onClick={() => navigate(`/product/${sweet._id}`)}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    height: "220px"
                  }}
                >
                  <img
                    src={sweet.image || "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80"}
                    alt={sweet.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.6s",
                      transform: hoveredCard === sweet._id ? "scale(1.1)" : "scale(1)"
                    }}
                  />
                  
                  {/* Stock Badge */}
                  <div style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: sweet.quantity > 10 
                      ? "linear-gradient(135deg, #77DD77, #4ADE80)"
                      : sweet.quantity > 0 
                      ? "linear-gradient(135deg, #FFB347, #FF6B9D)"
                      : "#999",
                    color: "white",
                    padding: "0.4rem 0.8rem",
                    borderRadius: "8px",
                    fontSize: "11px",
                    fontWeight: "700"
                  }}>
                    {sweet.quantity > 10 ? "In Stock" : sweet.quantity > 0 ? "Low Stock" : "Out of Stock"}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "1.25rem" }}>
                  {/* Category */}
                  <div style={{
                    display: "inline-block",
                    background: "rgba(177, 156, 217, 0.1)",
                    padding: "0.3rem 0.7rem",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: "700",
                    color: "#B19CD9",
                    marginBottom: "0.5rem"
                  }}>
                    {sweet.category}
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    marginBottom: "0.5rem",
                    color: "#2D1B4E"
                  }}>
                    {sweet.name}
                  </h3>

                  {/* Rating */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    marginBottom: "0.75rem"
                  }}>
                    {[1,2,3,4,5].map(star => (
                      <Star
                        key={star}
                        size={14}
                        fill={star <= 4 ? "#FFB347" : "none"}
                        color="#FFB347"
                      />
                    ))}
                    <span style={{ fontSize: "13px", color: "#666", marginLeft: "0.25rem" }}>
                      (4.5)
                    </span>
                  </div>

                  {/* Price and Quantity */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem"
                  }}>
                    <div style={{
                      fontSize: "24px",
                      fontWeight: "800",
                      background: "linear-gradient(135deg, #FF6B9D, #FFB347)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}>
                      ₹{sweet.price}
                    </div>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      Qty: {sweet.quantity}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => navigate(`/product/${sweet._id}`)}
                      style={{
                        flex: 1,
                        background: "transparent",
                        border: "2px solid #FF6B9D",
                        color: "#FF6B9D",
                        padding: "0.7rem",
                        borderRadius: "10px",
                        fontWeight: "700",
                        cursor: "pointer",
                        fontSize: "14px",
                        transition: "all 0.3s"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#FF6B9D";
                        e.target.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                        e.target.style.color = "#FF6B9D";
                      }}
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => handleAddToCart(sweet._id, 1)}
                      disabled={sweet.quantity === 0}
                      style={{
                        background: sweet.quantity === 0 
                          ? "#ccc"
                          : "linear-gradient(135deg, #FF6B9D, #FFB347)",
                        border: "none",
                        color: "white",
                        padding: "0.7rem 1rem",
                        borderRadius: "10px",
                        fontWeight: "700",
                        cursor: sweet.quantity === 0 ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        opacity: sweet.quantity === 0 ? 0.5 : 1,
                        transition: "all 0.3s"
                      }}
                    >
                      <ShoppingCart size={16} />
                    </button>
                  </div>

                  {/* Admin Actions */}
                  {user?.role === 'admin' && (
                    <div style={{
                      marginTop: "0.75rem",
                      paddingTop: "0.75rem",
                      borderTop: "1px solid #f0f0f0",
                      display: "flex",
                      gap: "0.5rem"
                    }}>
                      <button
                        onClick={() => navigate(`/admin?edit=${sweet._id}`)}
                        style={{
                          flex: 1,
                          background: "#B19CD9",
                          border: "none",
                          color: "white",
                          padding: "0.5rem",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: "700",
                          cursor: "pointer"
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm("Delete this sweet?")) {
                            try {
                              await sweetsAPI.deleteSweet(sweet._id);
                              setSuccessMessage("Sweet deleted!");
                              fetchSweets();
                            } catch {
                              setError("Failed to delete");
                            }
                          }
                        }}
                        style={{
                          flex: 1,
                          background: "#E57373",
                          border: "none",
                          color: "white",
                          padding: "0.5rem",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: "700",
                          cursor: "pointer"
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;