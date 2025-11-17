import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useCart } from './hooks/useCart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import ModernHome from './components/ModernHome';
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
      <Routes>
        {/* Modern Home Page - No Navbar */}
        <Route path="/" element={<ModernHome />} />

        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/register" element={<Register onLogin={login} />} />

        {/* Protected Routes with Navbar */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user} loading={loading}>
              <Navbar user={user} onLogout={logout} cartCount={user ? getCartCount() : 0} />
              <Dashboard user={user} />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProtectedRoute user={user} loading={loading}>
              <Navbar user={user} onLogout={logout} cartCount={user ? getCartCount() : 0} />
              <ProductDetail user={user} />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute user={user} loading={loading}>
              <Navbar user={user} onLogout={logout} cartCount={user ? getCartCount() : 0} />
              <Cart />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute user={user} loading={loading}>
              <Navbar user={user} onLogout={logout} cartCount={user ? getCartCount() : 0} />
              <Orders user={user} />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} loading={loading}>
              <Navbar user={user} onLogout={logout} cartCount={user ? getCartCount() : 0} />
              {user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" replace />}
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/super-admin"
          element={
            <ProtectedRoute user={user} loading={loading}>
              <Navbar user={user} onLogout={logout} cartCount={user ? getCartCount() : 0} />
              {user?.role === 'admin' ? <SuperAdmin /> : <Navigate to="/" replace />}
              <Footer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;