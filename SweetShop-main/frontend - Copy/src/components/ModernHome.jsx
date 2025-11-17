import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ChevronRight, Package, Sparkles, TrendingUp, Award } from 'lucide-react';
import { sweetsAPI, adminAPI } from '../utils/api';
import { useCart } from '../hooks/useCart';

const ModernHome = () => {
  const navigate = useNavigate();
  const { getCartCount, addToCart } = useCart();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchProducts();
    fetchStats();
    updateCartCount();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await sweetsAPI.getAllSweets();
      const topProducts = data.sweets.slice(0, 4).map((sweet, idx) => ({
        ...sweet,
        badge: idx === 0 ? "Bestseller" : idx === 1 ? "New" : idx === 2 ? "Popular" : null,
        rating: 4.5 + (Math.random() * 0.4),
        sales: Math.floor(Math.random() * 2000) + 500
      }));
      setProducts(topProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      if (token && user.role === 'admin') {
        const { data } = await adminAPI.getDashboardStats();
        setStats(data.stats);
      } else {
        const { data } = await sweetsAPI.getAllSweets();
        setStats({
          totalSweets: data.sweets.length,
          totalOrders: '500+',
          rating: '4.9',
          freshDaily: 'Always'
        });
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      setStats({
        totalSweets: '150+',
        totalOrders: '500+',
        rating: '4.9',
        freshDaily: 'Always'
      });
    }
  };

  const updateCartCount = () => {
    const count = getCartCount();
    setCartCount(count);
  };

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }

    const success = await addToCart(productId, 1);
    if (success) {
      updateCartCount();
      alert('Added to cart successfully! 🎉');
    } else {
      alert('Failed to add to cart. Please try again.');
    }
  };

  const handleViewProduct = (productId) => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate(`/product/${productId}`);
    } else {
      navigate('/login');
    }
  };

  const statsDisplay = [
    { icon: Package, label: "Products", value: stats?.totalSweets || '150+', color: "#FF6B9D" },
    { icon: Award, label: "Quality", value: "100%", color: "#FFB347" },
    { icon: TrendingUp, label: "Reviews", value: `${stats?.rating || '4.9'}★`, color: "#B19CD9" },
    { icon: Sparkles, label: "Fresh Daily", value: "Always", color: "#77DD77" }
  ];

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <div style={{ 
      fontFamily: "'Inter', sans-serif",
      background: "linear-gradient(135deg, #FFF8F3 0%, #FFF0F5 50%, #F5F0FF 100%)",
      minHeight: "100vh"
    }}>
      <header style={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 107, 157, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        padding: "1rem 2rem",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.05)"
      }}>
        <div style={{ 
          maxWidth: "1400px", 
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "48px",
              height: "48px",
              background: "linear-gradient(135deg, #FF6B9D, #FFB347)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              boxShadow: "0 8px 16px rgba(255, 107, 157, 0.3)",
              cursor: "pointer"
            }}
            onClick={() => navigate('/')}
            >
              🍰
            </div>
            <div>
              <h1 style={{ 
                fontSize: "24px", 
                fontWeight: "700",
                background: "linear-gradient(135deg, #FF6B9D, #B19CD9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                margin: 0,
                cursor: "pointer"
              }}
              onClick={() => navigate('/')}
              >
                The Mithai Box
              </h1>
              <p style={{ fontSize: "11px", color: "#666", margin: 0 }}>Premium Indian Sweets</p>
            </div>
          </div>

          <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            {[
              { name: 'Home', path: '/' },
              { name: 'Shop', path: '/dashboard' },
              { name: 'Orders', path: '/orders' },
              ...(user ? [
                { name: user.role === 'admin' ? 'Admin' : 'Account', path: user.role === 'admin' ? '/admin' : '/orders' }
              ] : [
                { name: 'Login', path: '/login' }
              ])
            ].map(item => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#333",
                  fontWeight: "600",
                  fontSize: "15px",
                  cursor: "pointer",
                  position: "relative",
                  padding: "0.5rem 0",
                  transition: "color 0.3s"
                }}
                onMouseEnter={e => e.target.style.color = "#FF6B9D"}
                onMouseLeave={e => e.target.style.color = "#333"}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <button style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              position: "relative"
            }}>
              <Heart size={22} color="#FF6B9D" />
            </button>
            <button 
              onClick={() => user ? navigate('/cart') : navigate('/login')}
              style={{
              background: "linear-gradient(135deg, #FF6B9D, #FFB347)",
              border: "none",
              borderRadius: "12px",
              padding: "0.75rem 1.5rem",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 12px rgba(255, 107, 157, 0.3)",
              transition: "transform 0.2s"
            }}
            onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.target.style.transform = "translateY(0)"}
            >
              <ShoppingCart size={18} />
              Cart ({cartCount})
            </button>
          </div>
        </div>
      </header>

      <section style={{
        padding: "4rem 2rem",
        maxWidth: "1400px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4rem",
        alignItems: "center"
      }}>
        <div>
          <div style={{
            display: "inline-block",
            background: "rgba(255, 107, 157, 0.1)",
            padding: "0.5rem 1rem",
            borderRadius: "50px",
            marginBottom: "1.5rem",
            fontSize: "13px",
            fontWeight: "600",
            color: "#FF6B9D"
          }}>
            ✨ Premium Quality Guaranteed
          </div>
          
          <h1 style={{
            fontSize: "64px",
            fontWeight: "800",
            lineHeight: "1.1",
            marginBottom: "1.5rem",
            background: "linear-gradient(135deg, #2D1B4E, #FF6B9D)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Sweetness<br/>Crafted to<br/>Perfection
          </h1>
          
          <p style={{
            fontSize: "18px",
            color: "#666",
            marginBottom: "2.5rem",
            lineHeight: "1.8"
          }}>
            Experience the authentic taste of traditional Indian sweets, 
            handcrafted with premium ingredients and generations of expertise.
          </p>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button 
              onClick={() => navigate('/dashboard')}
              style={{
              background: "linear-gradient(135deg, #FF6B9D, #FFB347)",
              border: "none",
              padding: "1rem 2.5rem",
              borderRadius: "16px",
              color: "white",
              fontWeight: "700",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(255, 107, 157, 0.3)",
              transition: "all 0.3s"
            }}
            onMouseEnter={e => {
              e.target.style.transform = "translateY(-4px)";
              e.target.style.boxShadow = "0 12px 32px rgba(255, 107, 157, 0.4)";
            }}
            onMouseLeave={e => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 8px 24px rgba(255, 107, 157, 0.3)";
            }}
            >
              Explore Collection
            </button>
            
            <button 
              onClick={() => user ? navigate('/dashboard') : navigate('/register')}
              style={{
              background: "white",
              border: "2px solid #FF6B9D",
              padding: "1rem 2.5rem",
              borderRadius: "16px",
              color: "#FF6B9D",
              fontWeight: "700",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseEnter={e => {
              e.target.style.background = "#FF6B9D";
              e.target.style.color = "white";
            }}
            onMouseLeave={e => {
              e.target.style.background = "white";
              e.target.style.color = "#FF6B9D";
            }}
            >
              {user ? 'Shop Now' : 'Sign Up'}
            </button>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div style={{
            width: "100%",
            height: "500px",
            background: "linear-gradient(135deg, rgba(255, 107, 157, 0.1), rgba(177, 156, 217, 0.1))",
            borderRadius: "32px",
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)"
          }}>
            <img 
              src="https://images.unsplash.com/photo-1630409346379-a37f0c4f6dfd?w=600&q=80"
              alt="Sweet"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          </div>
          
          <div style={{
            position: "absolute",
            bottom: "30px",
            right: "-30px",
            background: "white",
            padding: "1.5rem",
            borderRadius: "20px",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
            backdropFilter: "blur(10px)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "50px",
                height: "50px",
                background: "linear-gradient(135deg, #77DD77, #4ADE80)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px"
              }}>
                ⭐
              </div>
              <div>
                <div style={{ fontWeight: "700", fontSize: "20px" }}>{stats?.rating || '4.9'}/5</div>
                <div style={{ fontSize: "13px", color: "#666" }}>2,340+ Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{
        padding: "3rem 2rem",
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem"
        }}>
          {statsDisplay.map((stat, idx) => (
            <div key={idx} style={{
              background: "white",
              padding: "2rem",
              borderRadius: "24px",
              textAlign: "center",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
              transition: "transform 0.3s",
              cursor: "pointer"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-8px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{
                width: "60px",
                height: "60px",
                background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)`,
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                boxShadow: `0 8px 20px ${stat.color}44`
              }}>
                <stat.icon size={28} color="white" />
              </div>
              <div style={{ fontSize: "32px", fontWeight: "800", marginBottom: "0.5rem" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "14px", color: "#666", fontWeight: "600" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{
        padding: "4rem 2rem",
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        <div style={{ marginBottom: "3rem", textAlign: "center" }}>
          <h2 style={{
            fontSize: "48px",
            fontWeight: "800",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #2D1B4E, #FF6B9D)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Signature Collection
          </h2>
          <p style={{ fontSize: "18px", color: "#666" }}>
            Handpicked delicacies for every celebration
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <div className="spinner"></div>
            <p style={{ marginTop: "1rem", color: "#666" }}>Loading our delicious collection...</p>
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#666" }}>
            <p>No products available. Please check back later!</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem"
          }}>
            {products.map(product => (
              <div
                key={product._id}
                style={{
                  background: "white",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: hoveredCard === product._id 
                    ? "0 20px 60px rgba(255, 107, 157, 0.2)"
                    : "0 8px 24px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: hoveredCard === product._id ? "translateY(-12px)" : "translateY(0)",
                  cursor: "pointer",
                  position: "relative"
                }}
                onMouseEnter={() => setHoveredCard(product._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {product.badge && (
                  <div style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    background: product.badge === "New" 
                      ? "linear-gradient(135deg, #FFB347, #FF6B9D)"
                      : product.badge === "Bestseller"
                      ? "linear-gradient(135deg, #77DD77, #4ADE80)"
                      : "linear-gradient(135deg, #B19CD9, #8B7FB5)",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: "700",
                    zIndex: 10,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
                  }}>
                    {product.badge}
                  </div>
                )}

                <div style={{
                  position: "relative",
                  overflow: "hidden",
                  height: "280px"
                }}>
                  <img
                    src={product.image || "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80"}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.6s",
                      transform: hoveredCard === product._id ? "scale(1.1)" : "scale(1)"
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%)",
                    opacity: hoveredCard === product._id ? 1 : 0,
                    transition: "opacity 0.3s"
                  }} />
                </div>

                <div style={{ padding: "1.5rem" }}>
                  <div style={{
                    display: "inline-block",
                    background: "rgba(177, 156, 217, 0.1)",
                    padding: "0.4rem 0.8rem",
                    borderRadius: "8px",
                    fontSize: "11px",
                    fontWeight: "700",
                    color: "#B19CD9",
                    marginBottom: "0.75rem"
                  }}>
                    {product.category}
                  </div>

                  <h3 style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    marginBottom: "0.75rem",
                    color: "#2D1B4E"
                  }}>
                    {product.name}
                  </h3>

                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "1rem"
                  }}>
                    <div style={{ display: "flex", gap: "2px" }}>
                      {[1,2,3,4,5].map(star => (
                        <Star
                          key={star}
                          size={16}
                          fill={star <= Math.floor(product.rating) ? "#FFB347" : "none"}
                          color="#FFB347"
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: "14px", color: "#666", fontWeight: "600" }}>
                      {product.rating?.toFixed(1)} ({product.sales || 0} sold)
                    </span>
                  </div>

                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem"
                  }}>
                    <div style={{
                      fontSize: "28px",
                      fontWeight: "800",
                      background: "linear-gradient(135deg, #FF6B9D, #FFB347)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}>
                      ₹{product.price}
                    </div>

                    <div style={{ fontSize: "13px", color: "#666" }}>
                      Stock: {product.quantity}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button 
                      onClick={() => handleViewProduct(product._id)}
                      style={{
                        flex: 1,
                        background: hoveredCard === product._id
                          ? "linear-gradient(135deg, #FF6B9D, #FFB347)"
                          : "transparent",
                        border: "2px solid #FF6B9D",
                        borderRadius: "12px",
                        padding: "0.75rem 1rem",
                        color: hoveredCard === product._id ? "white" : "#FF6B9D",
                        fontWeight: "700",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px"
                      }}>
                      View
                      <ChevronRight size={16} />
                    </button>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product._id);
                      }}
                      disabled={product.quantity === 0}
                      style={{
                        background: product.quantity === 0 
                          ? "#ccc" 
                          : "linear-gradient(135deg, #77DD77, #4ADE80)",
                        border: "none",
                        borderRadius: "12px",
                        padding: "0.75rem 1rem",
                        color: "white",
                        fontWeight: "700",
                        cursor: product.quantity === 0 ? "not-allowed" : "pointer",
                        transition: "all 0.3s",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        opacity: product.quantity === 0 ? 0.5 : 1
                      }}>
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={{
        padding: "4rem 2rem",
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        <div style={{
          background: "linear-gradient(135deg, #2D1B4E, #FF6B9D, #FFB347)",
          borderRadius: "32px",
          padding: "4rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{
              fontSize: "48px",
              fontWeight: "800",
              color: "white",
              marginBottom: "1rem"
            }}>
              Ready to Experience Sweetness?
            </h2>
            <p style={{
              fontSize: "20px",
              color: "rgba(255, 255, 255, 0.9)",
              marginBottom: "2.5rem"
            }}>
              Join thousands of happy customers and order your favorites today
            </p>
            <button 
              onClick={() => user ? navigate('/dashboard') : navigate('/register')}
              style={{
              background: "white",
              border: "none",
              padding: "1.25rem 3rem",
              borderRadius: "16px",
              color: "#2D1B4E",
              fontWeight: "700",
              fontSize: "18px",
              cursor: "pointer",
              boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s"
            }}
            onMouseEnter={e => e.target.style.transform = "translateY(-4px)"}
            onMouseLeave={e => e.target.style.transform = "translateY(0)"}
            >
              {user ? 'Start Shopping Now' : 'Sign Up & Shop'}
            </button>
          </div>
        </div>
      </section>

      <footer style={{
        background: "#2D1B4E",
        color: "white",
        padding: "3rem 2rem 2rem",
        marginTop: "4rem"
      }}>
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "3rem",
          marginBottom: "2rem"
        }}>
          <div>
            <h3 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "1rem" }}>
              The Mithai Box
            </h3>
            <p style={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: "1.8" }}>
              Crafting premium Indian sweets with tradition, quality, and love since generations.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "1rem" }}>Shop</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {['All Products', 'Bestsellers', 'New Arrivals', 'Gift Boxes'].map(link => (
                <a key={link} href="#" style={{ color: "rgba(255, 255, 255, 0.7)", textDecoration: "none" }}>
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "1rem" }}>Company</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {['About Us', 'Contact', 'Careers'].map(link => (
                <a key={link} href="#" style={{ color: "rgba(255, 255, 255, 0.7)", textDecoration: "none" }}>
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "1rem" }}>Follow Us</h4>
            <div style={{ display: "flex", gap: "1rem" }}>
              {['📱', '📘', '📸', '🐦'].map((icon, idx) => (
                <div key={idx} style={{
                  width: "40px",
                  height: "40px",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background 0.3s"
                }}
                onMouseEnter={e => e.target.style.background = "rgba(255, 107, 157, 0.3)"}
                onMouseLeave={e => e.target.style.background = "rgba(255, 255, 255, 0.1)"}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          paddingTop: "2rem",
          textAlign: "center",
          color: "rgba(255, 255, 255, 0.5)",
          fontSize: "14px"
        }}>
          © 2024 The Mithai Box. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ModernHome;