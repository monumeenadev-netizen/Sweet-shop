import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../utils/api";

const Register = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await authAPI.register(email, password, role);
      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "60px",
        paddingBottom: "40px",
        background: "linear-gradient(135deg,#FFF9F2,#FFF4E6)",
      }}
    >
      <div
        className="form-container"
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "18px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          border: "2px solid #E8DCC5",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2
            style={{
              color: "#3E2F1D",
              fontSize: "34px",
              fontWeight: "800",
              marginBottom: "10px",
              letterSpacing: "-1px",
            }}
          >
            ❁ Create Your Account
          </h2>
          <p style={{ color: "#5A4733", fontWeight: "600" }}>
            Join The Mithai Box family today
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div
            style={{
              background: "#ffdddd",
              padding: "10px 14px",
              borderRadius: "10px",
              color: "#b13b3b",
              fontWeight: "600",
              marginBottom: "16px",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              background: "#E8DCC5",
              padding: "10px 14px",
              borderRadius: "10px",
              color: "#6B4F2C",
              fontWeight: "700",
              marginBottom: "16px",
            }}
          >
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <label
              className="form-label"
              style={{ fontWeight: "700", color: "#3E2F1D" }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              placeholder="you@email.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #D8CBB3",
              }}
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label
              className="form-label"
              style={{ fontWeight: "700", color: "#3E2F1D" }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              placeholder="••••••••"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #D8CBB3",
              }}
            />
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label
              className="form-label"
              style={{ fontWeight: "700", color: "#3E2F1D" }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              placeholder="••••••••"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #D8CBB3",
              }}
            />
          </div>

          {/* Role */}
          <div className="form-group">
            <label
              className="form-label"
              style={{ fontWeight: "700", color: "#3E2F1D" }}
            >
              Register As
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-control"
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #D8CBB3",
                cursor: "pointer",
              }}
            >
              <option value="user">Customer</option>
              <option value="admin">Shop Manager (Admin)</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "14px",
              background: "linear-gradient(135deg,#C59B5F,#B88646)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontWeight: "800",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(184,134,70,0.3)",
            }}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#5A4733",
            fontWeight: "600",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#B88646",
              fontWeight: "800",
              textDecoration: "none",
            }}
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
