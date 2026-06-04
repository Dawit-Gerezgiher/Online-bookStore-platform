# 📚 Online Bookstore Management System

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## 📖 Overview

The **Online Bookstore Management System** is a full-stack web application that enables customers to browse, search, purchase, and review books online. It also provides administrators with powerful tools to manage books, users, orders, and inventory through a centralized dashboard.

Built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and styled with **Tailwind CSS v4**, this application modernizes traditional bookstore operations by offering a digital solution accessible anytime, anywhere.

## ✨ Features

### 👤 Customer Features
- ✅ User registration and secure login (JWT authentication)
- ✅ Browse all available books
- ✅ View book details (title, author, category, price, stock, description)
- ✅ Place orders with quantity selection
- ✅ Real-time stock validation during order placement
- ✅ View complete order history with order status

### 👑 Admin Features
- ✅ Add new books to the catalog
- ✅ Update existing book information
- ✅ Delete books from the catalog
- ✅ Manage book inventory and stock levels
- ✅ View all customer orders
- ✅ Update order status (pending, paid, shipped, delivered)

### 🏗️ Design Patterns Implemented
- **Singleton Pattern** – MongoDB connection manager ensures a single database connection instance
- *(More patterns coming soon: Factory, Observer, Strategy)*

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React.js + Vite | Dynamic UI with component-based architecture |
| **Styling** | Tailwind CSS v4 | Modern, responsive, utility-first styling |
| **Backend** | Node.js + Express.js | RESTful API server with non-blocking I/O |
| **Database** | MongoDB + Mongoose | Flexible NoSQL document storage |
| **Authentication** | JWT + bcryptjs | Secure token-based authentication |
| **API Testing** | Postman | Endpoint testing and validation |
| **Version Control** | Git + GitHub | Source code management |

## 📁 Project Structure
onlineBookstore/
│
├── server.js # Application entry point (Singleton pattern)
├── package.json # Backend dependencies
├── .env # Environment variables
├── seedAdmin.js # Default admin account seeder
│
├── config/
│ └── db.js # MongoDB Singleton connection manager
│
├── models/
│ ├── User.js # User schema (customer/admin)
│ ├── Book.js # Book schema (title, author, price, stock, etc.)
│ └── Order.js # Order schema (items, total, status)
│
├── middleware/
│ └── auth.js # JWT verification & role-based access
│
├── routes/
│ ├── auth.js # Login/Register endpoints
│ ├── books.js # CRUD operations for books
│ └── orders.js # Create & retrieve orders
│
└── client/ # React frontend
├── src/
│ ├── components/ # Navbar, PrivateRoute, AdminRoute
│ ├── pages/ # Login, Register, BookList, AddBook, Orders, CreateOrder
│ ├── context/ # AuthContext for global auth state
│ ├── App.jsx # Main App component with routes
│ ├── main.jsx # Entry point
│ └── index.css # Tailwind imports
├── package.json # Frontend dependencies
└── vite.config.js # Vite configuration with proxy

text

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Step 1: Clone the repository

```bash
git clone https://github.com/yourusername/onlineBookstore.git
cd onlineBookstore
Step 2: Backend setup
bash
# Install backend dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookstore
JWT_SECRET=your_super_secret_key_change_this
EOF
Step 3: Frontend setup
bash
# Navigate to client directory
cd client

# Install frontend dependencies
npm install

# Return to root directory
cd ..
Step 4: Run the application
Terminal 1 (Backend):

bash
npm start
# Server runs on http://localhost:5000
Terminal 2 (Frontend):

bash
cd client
npm run dev
# Frontend runs on http://localhost:3000
Step 5: Access the application
Open your browser and navigate to: http://localhost:3000

👥 Demo Accounts
Role	Email	Password
Admin	admin@bookstore.com	Admin123!
Customer	Register via the app	User-defined
💡 Note: The admin account is automatically created when you first run the application.

📡 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
Books
Method	Endpoint	Description	Access
GET	/api/books	Get all books	Public
GET	/api/books/:id	Get single book	Public
POST	/api/books	Add new book	Admin only
PUT	/api/books/:id	Update book	Admin only
DELETE	/api/books/:id	Delete book	Admin only
Orders
Method	Endpoint	Description	Access
GET	/api/orders	Get user's orders	Authenticated users
POST	/api/orders	Create new order	Authenticated users
GET	/api/orders/:id	Get single order	Authenticated users
🎨 Screenshots
(Add your screenshots here)

text
📸 Home Page - Book Catalog
📸 Login & Registration Pages
📸 Admin Dashboard - Add Book Form
📸 Place Order Page
📸 Order History Page
🔒 Security Features
✅ Password hashing using bcrypt

✅ JWT tokens with 24-hour expiration

✅ Role-based access control (Customer/Admin)

✅ Input sanitization to prevent NoSQL injection

✅ CORS configuration for allowed origins

✅ Environment variables for sensitive data

🧪 Testing with Postman
Import the following endpoints to test with Postman:

POST http://localhost:5000/api/auth/register – Create new user

POST http://localhost:5000/api/auth/login – Get JWT token

GET http://localhost:5000/api/books – Fetch all books

POST http://localhost:5000/api/books – Add new book (Admin only, include token in headers)

POST http://localhost:5000/api/orders – Create order (include token)

GET http://localhost:5000/api/orders – Get order history (include token)

Request Header for protected routes:

text
Authorization: Bearer <your_jwt_token>
📊 Database Schema
User Collection
javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  passwordHash: String,
  role: ["customer", "admin"],
  createdAt: Date
}
Book Collection
javascript
{
  _id: ObjectId,
  title: String,
  author: String,
  category: String,
  price: Number,
  stock: Number,
  description: String,
  coverImageUrl: String,
  rating: Number,
  createdAt: Date
}
Order Collection
javascript
{
  _id: ObjectId,
  userId: ObjectId,
  items: [{ bookId, title, quantity, price }],
  totalAmount: Number,
  status: ["pending", "paid", "shipped", "delivered"],
  createdAt: Date
}
🚧 Future Enhancements
Implement payment gateway integration (Stripe/PayPal)

Add book search and filtering by category/author/price

Add book rating and review system

Implement email notifications for order status updates

Add shopping cart persistence

Create admin dashboard with sales analytics

Implement pagination for book listings

Add image upload for book covers

Deploy to production (Vercel/Netlify + Railway/Heroku)

🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
MongoDB for the flexible NoSQL database

Express.js for the minimalist web framework

React for the powerful UI library

Node.js for the JavaScript runtime

Tailwind CSS for the amazing utility-first CSS framework

Vite for the fast build tool



⭐ Show Your Support
If you found this project helpful, please give it a ⭐ on GitHub!
