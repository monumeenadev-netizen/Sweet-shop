import { Link } from "react-router-dom";
import img1 from "../assets/image1.png";
import img2 from "../assets/image2.png";
import img3 from "../assets/image3.png";
import img4 from "../assets/image.png";

const Home = () => {
  const categories = [
    {
      name: "Royal Kaju Katli",
      color: "#FFF4D6",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2OmQk2juthOTIdBR7781rYP8FmNt_q9UNjw&s",
    },
    {
      name: "Kesariya Peda",
      color: "#FFF4D6",
      img: img1,

    },
    {
      name: "Shahi Gulab Roll",
      color: "#FFF4D6",
      img: img2,
    },
    {
      name: "Malai Barfi",
      color: "#FFF4D6",
      img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Dry Fruit Laddu",
      color: "#FFF4D6",
      img: img3,
    },
  ];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #FFF9F2, #FFF4E6)",
        minHeight: "100vh",
        fontFamily: "Poppins",
      }}
    >
      {/* HERO SECTION */}
      <section
        style={{
          minHeight: "600px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "80px",
          paddingBottom: "60px",
          position: "relative",
        }}
      >
        {/* Left Glow */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "35%",
            height: "100%",
            background:
              "radial-gradient(circle at 10% 50%, rgba(255,210,140,0.25), transparent)",
          }}
        />

        {/* Right Glow */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "35%",
            height: "100%",
            background:
              "radial-gradient(circle at 90% 50%, rgba(176,132,78,0.15), transparent)",
          }}
        />

        <div style={{ textAlign: "center", maxWidth: "650px", zIndex: 2 }}>
          <h1
            style={{
              fontSize: "54px",
              fontWeight: "800",
              color: "#3E2F1D",
              marginBottom: "20px",
              letterSpacing: "-1px",
            }}
          >
            Crafted Sweetness for Every Celebration
          </h1>

          <p
            style={{
              fontSize: "18px",
              fontWeight: "500",
              color: "#5a4733",
              marginBottom: "40px",
            }}
          >
            Handcrafted Indian delicacies prepared with purity, passion, and
            tradition.
          </p>

          <Link
            to="/dashboard"
            style={{
              background: "linear-gradient(135deg, #C59B5F, #B88646)",
              color: "white",
              padding: "14px 40px",
              borderRadius: "50px",
              textDecoration: "none",
              fontWeight: "700",
              boxShadow: "0 8px 20px rgba(181, 140, 70, 0.25)",
            }}
          >
            Explore Sweets
          </Link>
        </div>

        <div
          style={{
            fontSize: "48px",
            color: "#C59B5F",
            marginTop: "40px",
            animation: "bounce 2s infinite",
            fontWeight: 300,
          }}
        >
          ❁
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section style={{ padding: "80px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "42px",
            fontWeight: "700",
            color: "#3E2F1D",
            marginBottom: "60px",
          }}
        >
          Signature Collections
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
          }}
        >
          {categories.map((cat) => (
            <Link key={cat.name} to="/dashboard" style={{ textDecoration: "none" }}>
              <div
                style={{
                  background: cat.color,
                  borderRadius: "18px",
                  padding: "40px 20px",
                  textAlign: "center",
                  border: "1px solid #C59B5F",
                  transition: "0.3s ease",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 28px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(0,0,0,0.1)";
                }}
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "cover",
                    borderRadius: "14px",
                    marginBottom: "14px",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                  }}
                />

                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#3E2F1D",
                  }}
                >
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        style={{
          padding: "80px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #FFF4D6, #FBE9C8)",
            height: "400px",
            borderRadius: "20px",
            border: "2px solid #C59B5F",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={img4}
            alt="About Sweet"
            style={{
              width: "80%",
              height: "80%",
              borderRadius: "18px",
              objectFit: "cover",
            }}
          />
        </div>

        <div>
          <h2
            style={{
              fontSize: "42px",
              color: "#3E2F1D",
              marginBottom: "20px",
              fontWeight: "700",
            }}
          >
            Tradition in Every Bite
          </h2>

          <p
            style={{
              fontSize: "16px",
              color: "#5A4733",
              fontWeight: "500",
              lineHeight: "1.8",
              marginBottom: "16px",
            }}
          >
            Every sweet is handcrafted using recipes passed down through
            generations—bringing authentic flavors to your celebrations.
          </p>

          <p
            style={{
              fontSize: "16px",
              color: "#5A4733",
              fontWeight: "500",
              lineHeight: "1.8",
            }}
          >
            Using only premium ingredients, we ensure purity, freshness, and a
            melt-in-mouth experience.
          </p>
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        style={{
          padding: "80px 20px",
          textAlign: "center",
          background: "linear-gradient(135deg, #C59B5F, #B88646)",
          borderRadius: "20px",
          maxWidth: "1200px",
          margin: "60px auto",
          color: "white",
        }}
      >
        <h2 style={{ fontSize: "42px", fontWeight: "700", marginBottom: "20px" }}>
          Bring Home the Sweetness
        </h2>

        <p
          style={{
            fontSize: "18px",
            fontWeight: "500",
            marginBottom: "30px",
          }}
        >
          Discover our handpicked selection of luxurious Indian sweets.
        </p>

        <Link
          to="/dashboard"
          style={{
            background: "#fff",
            color: "#B88646",
            padding: "14px 40px",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: "700",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}
        >
          Browse Collection
        </Link>
      </section>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
      `}</style>
    </div>
  );
};

export default Home;
