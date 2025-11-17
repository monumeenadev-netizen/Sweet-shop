import { Navigate } from 'react-router-dom';

// REFACTOR: Add loading state UI
const ProtectedRoute = ({ children, user, loading }) => {
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
