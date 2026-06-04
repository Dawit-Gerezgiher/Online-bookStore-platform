import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="text-center py-8">Loading...</div>;
  
  return user && user.role === 'admin' ? children : <Navigate to="/books" />;
};

export default AdminRoute;