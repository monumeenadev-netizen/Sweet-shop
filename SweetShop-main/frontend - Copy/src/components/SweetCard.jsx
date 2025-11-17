import { useState } from "react";
import { Link } from "react-router-dom";

const SweetCard = ({
  sweet,
  isAdmin = false,
  onPurchase,
  onDelete,
  onEdit,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [showQuantity, setShowQuantity] = useState(false);

  // Premium emoji placeholder per category
  const getCategoryEmoji = (name) => {
    const map = {
      "Gulab Jamun": "🍮",
      Rasgulla: "⚪",
      Jalebi: "🌀",
      Barfi: "🧁",
      Laddu: "🟡",
      Kheer: "🥣",
      Halwa: "🍯",
      Fafda: "🍘",
    };
    return map[name] || "🍰";
  };

  const handleAddToCart = () => {
    onAddToCart?.(sweet._id, quantity);
    setQuantity(1);
    setShowQuantity(false);
  };

  const handleBuyNow = () => {
    onAddToCart?.(sweet._id, quantity);
    window.location.href = "/cart";
  };

  return (
    <Link to={`/product/${sweet._id}`} style={{ textDecoration: "none" }}>
      <div
        className="sweet-card"
        style={{
          borderRadius: "18px",
          overflow: "hidden",
          background: "white",
          border: "2px solid rgba(197,155,95,0.35)",
          boxShadow: "0 10px 30px rgba(66,42,8,0.1)",
          transition: "all 0.35s ease",
        }}
      >
        {/* Image */}
        <div
          className="sweet-card-image"
          style={{
            height: "200px",
            borderBottom: "2px solid rgba(197,155,95,0.25)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {sweet.image ? (
            <img
              src={sweet.image}
              alt={sweet.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "scale 0.4s ease",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "#FFF7EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "64px",
              }}
            >
              {getCategoryEmoji(sweet.category)}
            </div>
          )}

          {/* Category Badge */}
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              background: "rgba(255,255,255,0.85)",
              padding: "6px 14px",
              borderRadius: "30px",
              fontWeight: "700",
              fontSize: "12px",
              color: "#8A5A2D",
              border: "1px solid rgba(197,155,95,0.35)",
              backdropFilter: "blur(6px)",
            }}
          >
            {sweet.category}
          </div>
        </div>

        {/* Body */}
        <div
          className="sweet-card-body"
          style={{ padding: "16px 18px", textAlign: "left" }}
        >
          <h3
            className="sweet-card-title"
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#4A3A2A",
              margin: "0 0 6px 0",
            }}
          >
            {sweet.name}
          </h3>

          <p
            className="sweet-card-price"
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#C59B5F",
              margin: "0 0 12px 0",
            }}
          >
            ₹{sweet.price.toFixed(2)}
          </p>

          {/* Quantity/Stock Badge */}
          <p style={{ margin: 0 }}>
            <span
              style={{
                background:
                  sweet.quantity === 0
                    ? "#FF6B6B"
                    : sweet.quantity < 5
                    ? "#F4A261"
                    : "#C59B5F",
                padding: "6px 14px",
                borderRadius: "30px",
                fontSize: "12px",
                fontWeight: "700",
                color: "white",
              }}
            >
              {sweet.quantity === 0
                ? "Out of Stock"
                : `${sweet.quantity} available`}
            </span>
          </p>
        </div>

        {/* Actions */}
        <div
          className="sweet-card-actions"
          onClick={(e) => e.preventDefault()}
          style={{
            padding: "14px 18px",
            borderTop: "1px solid rgba(197,155,95,0.2)",
            background: "#FFFDF8",
          }}
        >
          {!isAdmin ? (
            <>
              {showQuantity ? (
                <>
                  {/* Quantity selector */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      flex: 1,
                      background: "#FFF7EB",
                      borderRadius: "12px",
                      padding: "8px",
                      border: "1px solid rgba(197,155,95,0.35)",
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setQuantity(Math.max(1, quantity - 1));
                      }}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "10px",
                        border: "none",
                        background: "white",
                        fontSize: "18px",
                        cursor: "pointer",
                      }}
                    >
                      −
                    </button>

                    <span
                      style={{
                        flex: 1,
                        textAlign: "center",
                        fontWeight: "700",
                      }}
                    >
                      {quantity}
                    </span>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setQuantity(quantity + 1);
                      }}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "10px",
                        border: "none",
                        background: "white",
                        fontSize: "18px",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Add Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart();
                    }}
                    disabled={sweet.quantity === 0}
                    style={{
                      minWidth: "80px",
                      background:
                        "linear-gradient(135deg,#C59B5F,#B88646)",
                      color: "white",
                      border: "none",
                      borderRadius: "12px",
                      padding: "10px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    Add
                  </button>

                  {/* Buy Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleBuyNow();
                    }}
                    disabled={sweet.quantity === 0}
                    style={{
                      minWidth: "80px",
                      background: "#4A3A2A",
                      color: "white",
                      border: "none",
                      borderRadius: "12px",
                      padding: "10px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    Buy
                  </button>
                </>
              ) : (
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowQuantity(true);
                    }}
                    disabled={sweet.quantity === 0}
                    style={{
                      flex: 1,
                      padding: "12px",
                      borderRadius: "12px",
                      border: "none",
                      fontWeight: "700",
                      background:
                        "linear-gradient(135deg,#C59B5F,#B88646)",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    {sweet.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowQuantity(true);
                    }}
                    disabled={sweet.quantity === 0}
                    style={{
                      flex: 1,
                      padding: "12px",
                      borderRadius: "12px",
                      border: "none",
                      fontWeight: "700",
                      background: "#4A3A2A",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Admin Buttons */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onEdit?.(sweet);
                }}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  background: "#4A3A2A",
                  color: "white",
                  border: "none",
                  fontWeight: "700",
                  marginBottom: "8px",
                }}
              >
                Edit
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  onDelete?.(sweet._id);
                }}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  background: "#D9534F",
                  color: "white",
                  border: "none",
                  fontWeight: "700",
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SweetCard;
