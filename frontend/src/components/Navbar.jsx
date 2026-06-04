import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          <Link to="/books" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            BookStore
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/books" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Books
            </Link>
            
            {user && (
              <>
                <Link to="/orders" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  My Orders
                </Link>
                <Link to="/create-order" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Place Order
                </Link>
                {user.role === 'admin' && (
                  <Link to="/add-book" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    Add Book
                  </Link>
                )}
              </>
            )}
            
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;