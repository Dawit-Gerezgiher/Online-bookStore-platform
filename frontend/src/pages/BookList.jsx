import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-600">Loading books...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Book Collection</h1>
      
      {books.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <p className="text-gray-500 text-lg">No books available yet.</p>
          {user?.role === 'admin' && (
            <p className="text-gray-500 mt-2">Click "Add Book" to add your first book!</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <div key={book._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{book.title}</h3>
                <p className="text-gray-600 mb-1">by {book.author}</p>
                <p className="text-sm text-gray-500 mb-2">{book.category}</p>
                <p className="text-2xl font-bold text-blue-600 mb-2">${book.price}</p>
                <p className="text-sm text-gray-600 mb-3">
                  Stock: <span className={book.stock > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {book.stock > 0 ? `${book.stock} available` : 'Out of stock'}
                  </span>
                </p>
                {book.description && (
                  <p className="text-gray-500 text-sm mb-4 line-clamp-3">{book.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;