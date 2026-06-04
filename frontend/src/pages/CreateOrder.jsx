import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateOrder = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      setBooks(response.data.filter(book => book.stock > 0));
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addItem = (bookId) => {
    const existingItem = selectedItems.find(item => item.bookId === bookId);
    const book = books.find(b => b._id === bookId);
    
    if (existingItem) {
      if (existingItem.quantity < book.stock) {
        setSelectedItems(selectedItems.map(item =>
          item.bookId === bookId ? { ...item, quantity: item.quantity + 1 } : item
        ));
      } else {
        setError(`Cannot exceed available stock for ${book.title}`);
        setTimeout(() => setError(''), 3000);
      }
    } else {
      setSelectedItems([...selectedItems, { bookId, quantity: 1 }]);
    }
  };

  const removeItem = (bookId) => {
    setSelectedItems(selectedItems.filter(item => item.bookId !== bookId));
  };

  const updateQuantity = (bookId, quantity) => {
    const book = books.find(b => b._id === bookId);
    if (quantity > book.stock) {
      setError(`Cannot exceed available stock for ${book.title}`);
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (quantity > 0) {
      setSelectedItems(selectedItems.map(item =>
        item.bookId === bookId ? { ...item, quantity } : item
      ));
    } else {
      removeItem(bookId);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedItems.length === 0) {
      setError('Please select at least one book to order');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.post('/api/orders', { items: selectedItems });
      navigate('/orders');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  const getTotal = () => {
    return selectedItems.reduce((total, item) => {
      const book = books.find(b => b._id === item.bookId);
      return total + (book?.price || 0) * item.quantity;
    }, 0);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Place New Order</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available Books</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {books.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No books available</p>
            ) : (
              books.map((book) => (
                <div key={book._id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{book.title}</p>
                    <p className="text-sm text-gray-500">{book.author}</p>
                    <p className="text-blue-600 font-semibold">${book.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">Stock: {book.stock}</p>
                  </div>
                  <button
                    onClick={() => addItem(book._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add to Order
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
          
          {selectedItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No items selected. Add books from the left panel.</p>
          ) : (
            <>
              <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                {selectedItems.map((item) => {
                  const book = books.find(b => b._id === item.bookId);
                  if (!book) return null;
                  
                  return (
                    <div key={item.bookId} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-gray-800">{book.title}</p>
                          <p className="text-sm text-gray-500">${book.price.toFixed(2)} each</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.bookId)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.bookId, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                            className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-semibold">${(book.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg font-semibold text-gray-800">Total:</p>
                  <p className="text-2xl font-bold text-blue-600">${getTotal().toFixed(2)}</p>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50"
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;