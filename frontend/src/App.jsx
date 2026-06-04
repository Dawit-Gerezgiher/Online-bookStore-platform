import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import Orders from './pages/Orders';
import CreateOrder from './pages/CreateOrder';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen">
          <Navbar />
          <main className="container mx-auto px-4 py-8 max-w-7xl">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/books" element={<BookList />} />
              <Route path="/orders" element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              } />
              <Route path="/create-order" element={
                <PrivateRoute>
                  <CreateOrder />
                </PrivateRoute>
              } />
              <Route path="/add-book" element={
                <AdminRoute>
                  <AddBook />
                </AdminRoute>
              } />
              <Route path="/" element={<Navigate to="/books" />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;