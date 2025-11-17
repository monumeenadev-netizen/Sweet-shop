import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useCart } from './hooks/useCart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';   // ✅ ADDED
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProductDetail from './pages/ProductDetail';
import AdminPanel from './pages/AdminPanel';
import SuperAdmin from './pages/SuperAdmin';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import './App.css';

function App() {
  const { user, login, logout, loading } = useAuth();
  const { getCartCount } = useCart();

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={logout} cartCount={user ? getCartCount() : 0} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/register" element={<Register onLogin={login} />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user} loading={loading}>
              <Dashboard user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProtectedRoute user={user} loading={loading}>
              <ProductDetail user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute user={user} loading={loading}>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute user={user} loading={loading}>
              <Orders user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} loading={loading}>
              {user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" replace />}
            </ProtectedRoute>
          }
        />

        <Route
          path="/super-admin"
          element={
            <ProtectedRoute user={user} loading={loading}>
              {user?.role === 'admin' ? <SuperAdmin /> : <Navigate to="/" replace />}
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer /> {/* ✅ FOOTER ADDED HERE */}
    </BrowserRouter>
  );
}

export default App;
