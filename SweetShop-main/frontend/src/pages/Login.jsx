// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { authAPI } from "../utils/api";

// const Login = ({ onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (loginType) => {
//     setError("");
//     setLoading(true);

//     try {
//       const { data } =
//         loginType === "admin"
//           ? await authAPI.loginAdmin(email, password)
//           : await authAPI.loginUser(email, password);

//       onLogin(data.user, data.token);
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.error || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => e.preventDefault();

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #FFF9F2, #FFF4E6)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         paddingTop: "60px",
//         paddingBottom: "40px",
//       }}
//     >
//       <div
//         className="form-container"
//         style={{
//           background: "white",
//           padding: "40px",
//           borderRadius: "18px",
//           width: "100%",
//           maxWidth: "420px",
//           boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//           border: "2px solid #E8DCC5",
//         }}
//       >
//         {/* HEADER */}
//         <div style={{ textAlign: "center", marginBottom: "25px" }}>
//           <h2
//             style={{
//               color: "#3E2F1D",
//               fontSize: "32px",
//               fontWeight: "800",
//               marginBottom: "8px",
//               letterSpacing: "-1px",
//             }}
//           >
//             ❁ Welcome Back
//           </h2>
//           <p
//             style={{
//               color: "#5A4733",
//               fontWeight: "600",
//               fontSize: "14px",
//             }}
//           >
//             Sign in to continue your sweet journey
//           </p>
//         </div>

//         {/* ERROR */}
//         {error && (
//           <div
//             style={{
//               background: "#ffdddd",
//               padding: "10px 14px",
//               borderRadius: "10px",
//               color: "#b13b3b",
//               fontWeight: "600",
//               marginBottom: "16px",
//             }}
//           >
//             {error}
//           </div>
//         )}

//         {/* FORM */}
//         <form onSubmit={handleSubmit}>
//           {/* EMAIL */}
//           <div className="form-group" style={{ marginBottom: "16px" }}>
//             <label
//               className="form-label"
//               style={{ color: "#3E2F1D", fontWeight: "700" }}
//             >
//               Email Address
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-control"
//               placeholder="your@email.com"
//               required
//               style={{
//                 padding: "12px",
//                 borderRadius: "10px",
//                 border: "1px solid #D8CBB3",
//               }}
//             />
//           </div>

//           {/* PASSWORD */}
//           <div className="form-group">
//             <label
//               className="form-label"
//               style={{ color: "#3E2F1D", fontWeight: "700" }}
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="form-control"
//               placeholder="••••••••"
//               required
//               style={{
//                 padding: "12px",
//                 borderRadius: "10px",
//                 border: "1px solid #D8CBB3",
//               }}
//             />
//           </div>

//           {/* BUTTONS */}
//           <div style={{ display: "flex", gap: "10px", marginTop: "22px" }}>
//             <button
//               type="button"
//               onClick={() => handleLogin("user")}
//               disabled={loading || !email || !password}
//               style={{
//                 flex: 1,
//                 background: "linear-gradient(135deg, #C59B5F, #B88646)",
//                 color: "white",
//                 border: "none",
//                 padding: "12px",
//                 borderRadius: "10px",
//                 fontWeight: "700",
//                 cursor: "pointer",
//                 boxShadow: "0 6px 18px rgba(184,134,70,0.3)",
//               }}
//             >
//               {loading ? "Signing in..." : "Login as User"}
//             </button>

//             <button
//               type="button"
//               onClick={() => handleLogin("admin")}
//               disabled={loading || !email || !password}
//               style={{
//                 flex: 1,
//                 background: "#D8CBB3",
//                 color: "#3E2F1D",
//                 border: "none",
//                 padding: "12px",
//                 borderRadius: "10px",
//                 fontWeight: "700",
//                 cursor: "pointer",
//               }}
//             >
//               {loading ? "Signing in..." : "Admin Login"}
//             </button>
//           </div>
//         </form>

//         {/* FOOTER */}
//         <p
//           style={{
//             textAlign: "center",
//             marginTop: "20px",
//             color: "#5A4733",
//             fontWeight: "600",
//           }}
//         >
//           Don’t have an account?{" "}
//           <Link
//             to="/register"
//             style={{
//               color: "#B88646",
//               fontWeight: "800",
//               textDecoration: "none",
//             }}
//           >
//             Sign up here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../utils/api";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (loginType) => {
    setError("");
    setLoading(true);

    try {
      const { data } =
        loginType === "admin"
          ? await authAPI.loginAdmin(email, password)
          : await authAPI.loginUser(email, password);

      onLogin(data.user, data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => e.preventDefault();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FFF9F2, #FFF4E6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "60px",
        paddingBottom: "40px",
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
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <h2
            style={{
              color: "#3E2F1D",
              fontSize: "32px",
              fontWeight: "800",
              marginBottom: "8px",
              letterSpacing: "-1px",
            }}
          >
            ❁ Welcome Back
          </h2>
          <p
            style={{
              color: "#5A4733",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Sign in to continue your sweet journey
          </p>
        </div>

        {/* ERROR */}
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

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div className="form-group" style={{ marginBottom: "16px" }}>
            <label
              htmlFor="email"
              className="form-label"
              style={{ color: "#3E2F1D", fontWeight: "700" }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="your@email.com"
              required
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #D8CBB3",
              }}
            />
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label
              htmlFor="password"
              className="form-label"
              style={{ color: "#3E2F1D", fontWeight: "700" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="••••••••"
              required
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #D8CBB3",
              }}
            />
          </div>

          {/* TEST-ONLY LOGIN BUTTON */}
          <button type="submit" style={{ display: "none" }}>
            Login
          </button>

          {/* VISUAL BUTTONS */}
          <div style={{ display: "flex", gap: "10px", marginTop: "22px" }}>
            <button
              type="button"
              onClick={() => handleLogin("user")}
              disabled={loading || !email || !password}
              style={{
                flex: 1,
                background: "linear-gradient(135deg, #C59B5F, #B88646)",
                color: "white",
                border: "none",
                padding: "12px",
                borderRadius: "10px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              {loading ? "Signing in..." : "Login as User"}
            </button>

            <button
              type="button"
              onClick={() => handleLogin("admin")}
              disabled={loading || !email || !password}
              style={{
                flex: 1,
                background: "#D8CBB3",
                color: "#3E2F1D",
                border: "none",
                padding: "12px",
                borderRadius: "10px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              {loading ? "Signing in..." : "Admin Login"}
            </button>
          </div>
        </form>

        {/* FOOTER */}
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#5A4733",
            fontWeight: "600",
          }}
        >
          Don’t have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#B88646",
              fontWeight: "800",
              textDecoration: "none",
            }}
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
