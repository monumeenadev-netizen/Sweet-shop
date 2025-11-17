import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { sweetsAPI } from "../utils/api";
import { useCart } from "../hooks/useCart";

const ProductDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sweet, setSweet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await sweetsAPI.getAllSweets();
      const product = data.sweets.find((s) => s._id === id);
      setSweet(product || null);
      if (!product) setError("Product not found");
    } catch {
      setError("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (quantity <= 0) {
      setError("Please select a valid quantity");
      return;
    }

    const ok = await addToCart(id, quantity);
    if (ok) {
      setSuccess("❁ Added to cart!");
      setTimeout(() => setSuccess(""), 3000);
    } else {
      setError("Failed to add to cart");
    }
  };

  const handleBuyNow = async () => {
    const ok = await addToCart(id, quantity);
    if (ok) navigate("/cart");
    else setError("Failed to add to cart");
  };

  const getSweetEmoji = (category) => {
    const emojiMap = {
      "Gulab Jamun": "🍮",
      Rasgulla: "⚪",
      Jalebi: "🌀",
      Barfi: "🟫",
      Laddu: "🟡",
      Kheer: "🥣",
      Halwa: "🍯",
      Fafda: "🍪",
      Chocolates: "🍫",
      Gummies: "🍬",
      Lollipops: "🍭",
      "Candy Jars": "🫙",
      Macarons: "🍪",
    };
    return emojiMap[category] || "🍰";
  };

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          paddingTop: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="spinner"></div>
      </div>
    );

  if (error || !sweet)
    return (
      <div style={{ minHeight: "100vh", paddingTop: "80px" }}>
        <div className="container">
          <div
            style={{
              background: "#ffdddd",
              padding: "14px",
              color: "#b13b3b",
              borderRadius: "12px",
              marginBottom: "15px",
              fontWeight: "700",
            }}
          >
            {error || "Product not found"}
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="btn btn-primary"
          >
            Back to Products
          </button>
        </div>
      </div>
    );

  /* STOCK THEMING */
  const stockStatus =
    sweet.quantity > 10
      ? "In Stock"
      : sweet.quantity > 0
      ? "Low Stock"
      : "Out of Stock";

  const stockColor =
    sweet.quantity > 10
      ? "#7A5C2E"
      : sweet.quantity > 0
      ? "#C89F6A"
      : "#B13B3B";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#FFF9F2,#FFF4E6)",
        paddingTop: "80px",
        paddingBottom: "40px",
      }}
    >
      <div className="container">
        {success && (
          <div
            style={{
              background: "#E8DCC5",
              padding: "12px",
              borderRadius: "10px",
              color: "#6B4F2C",
              marginBottom: "16px",
              fontWeight: "700",
            }}
          >
            {success}
          </div>
        )}

        {error && (
          <div
            style={{
              background: "#ffdddd",
              padding: "12px",
              borderRadius: "10px",
              color: "#b13b3b",
              marginBottom: "16px",
              fontWeight: "700",
            }}
          >
            {error}
          </div>
        )}

        {/* BREADCRUMB */}
        <div
          style={{
            marginBottom: "32px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            fontWeight: "600",
            color: "#6B4F2C",
          }}
        >
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              background: "none",
              border: "none",
              color: "#B88646",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            Products
          </button>
          <span>/</span>
          <span>{sweet.category}</span>
          <span>/</span>
          <span>{sweet.name}</span>
        </div>

        {/* MAIN GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "start",
          }}
        >
          {/* IMAGE PANEL */}
          <div>
            <div
              style={{
                background:
                  "linear-gradient(135deg,#F6EFD9,#F0DABA,#E8D3A8,#E4C99A)",
                borderRadius: "22px",
                padding: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "500px",
                boxShadow: "0 15px 40px rgba(132,94,37,0.15)",
              }}
            >
              {sweet.image ? (
                <img
                  src={sweet.image}
                  alt={sweet.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "420px",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <div style={{ fontSize: "200px" }}>
                  {getSweetEmoji(sweet.category)}
                </div>
              )}
            </div>
          </div>

          {/* DETAILS PANEL */}
          <div>
            {/* CATEGORY BADGE */}
            <span
              style={{
                background: "#E8DCC5",
                color: "#6B4F2C",
                padding: "6px 14px",
                borderRadius: "18px",
                fontSize: "13px",
                fontWeight: "700",
              }}
            >
              ❁ {sweet.category}
            </span>

            {/* TITLE */}
            <h1
              style={{
                fontSize: "42px",
                fontWeight: "800",
                marginTop: "16px",
                color: "#3E2F1D",
                letterSpacing: "-1px",
              }}
            >
              {sweet.name}
            </h1>

            {/* FAKE REVIEWS */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginBottom: "22px",
                color: "#B88646",
                fontWeight: "700",
              }}
            >
              ⭐⭐⭐⭐⭐ <span style={{ color: "#6B4F2C" }}>(128 reviews)</span>
            </div>

            {/* PRICE CARD */}
            <div
              style={{
                background: "#F8EFE2",
                padding: "22px",
                borderRadius: "18px",
                marginBottom: "28px",
                border: "2px solid #E8DCC5",
              }}
            >
              <span
                style={{
                  fontSize: "38px",
                  fontWeight: "800",
                  color: "#B88646",
                }}
              >
                ₹{sweet.price.toFixed(2)}
              </span>
              <p
                style={{
                  fontSize: "13px",
                  color: "#6B4F2C",
                  marginTop: "6px",
                }}
              >
                Inclusive of all taxes
              </p>
            </div>

            {/* STOCK */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                marginBottom: "28px",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: stockColor,
                }}
              />
              <span
                style={{ color: stockColor, fontWeight: "700", fontSize: "16px" }}
              >
                {stockStatus}
              </span>
              <span style={{ color: "#6B4F2C", fontSize: "14px" }}>
                ({sweet.quantity} available)
              </span>
            </div>

            {/* QUANTITY */}
            <div style={{ marginBottom: "28px" }}>
              <label
                style={{
                  fontWeight: "700",
                  color: "#4A3A2A",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
                Quantity:
              </label>

              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    background: "#F8EFE2",
                    border: "1px solid #E8DCC5",
                    fontWeight: "800",
                    cursor: "pointer",
                  }}
                >
                  –
                </button>

                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const q = parseInt(e.target.value) || 1;
                    if (q > 0 && q <= sweet.quantity) setQuantity(q);
                  }}
                  style={{
                    width: "60px",
                    height: "42px",
                    textAlign: "center",
                    borderRadius: "10px",
                    border: "1px solid #E8DCC5",
                    fontWeight: "700",
                    fontSize: "16px",
                  }}
                />

                <button
                  onClick={() =>
                    setQuantity(Math.min(sweet.quantity, quantity + 1))
                  }
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    background: "#F8EFE2",
                    border: "1px solid #E8DCC5",
                    fontWeight: "800",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* BUTTONS */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
                marginBottom: "10px",
              }}
            >
              <button
                onClick={handleAddToCart}
                disabled={sweet.quantity === 0}
                style={{
                  background: "linear-gradient(135deg,#C59B5F,#B88646)",
                  border: "none",
                  padding: "16px",
                  borderRadius: "14px",
                  fontWeight: "800",
                  color: "white",
                }}
              >
                🛒 Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                disabled={sweet.quantity === 0}
                style={{
                  background: "#6B4F2C",
                  border: "none",
                  padding: "16px",
                  borderRadius: "14px",
                  fontWeight: "800",
                  color: "white",
                }}
              >
                💳 Buy Now
              </button>
            </div>

            {/* CONTINUE SHOPPING */}
            <button
              onClick={() => navigate("/dashboard")}
              style={{
                width: "100%",
                background: "#E8DCC5",
                padding: "16px",
                borderRadius: "14px",
                color: "#3E2F1D",
                fontWeight: "800",
                border: "none",
                marginTop: "10px",
              }}
            >
              Continue Shopping
            </button>

            {/* DESCRIPTION */}
            <div
              style={{
                marginTop: "40px",
                paddingTop: "40px",
                borderTop: "1px solid #E8DCC5",
              }}
            >
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "800",
                  color: "#3E2F1D",
                  marginBottom: "16px",
                }}
              >
                About this Product
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  marginBottom: "18px",
                }}
              >
                <p>
                  <strong>Category:</strong> {sweet.category}
                </p>
                <p>
                  <strong>Price:</strong> ₹{sweet.price}
                </p>
                <p>
                  <strong>Stock:</strong> {sweet.quantity} units
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span style={{ color: stockColor }}>{stockStatus}</span>
                </p>
              </div>

              <p
                style={{
                  color: "#4A3A2A",
                  lineHeight: "1.8",
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                Crafted with premium ingredients and traditional techniques,
                our {sweet.category.toLowerCase()} offers unmatched flavor,
                freshness, and texture. Perfect for gifting, celebrations, or
                indulging yourself in something extraordinary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
