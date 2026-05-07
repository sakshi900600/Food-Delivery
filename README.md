# 🍕 Food Delivery Application

A full-stack food delivery web application built with **React**, **Node.js**, **Express**, and **MongoDB**. Complete solution for ordering food online with admin panel, user authentication, and payment integration.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Documentation](#documentation)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### 👤 User Features
- ✅ User authentication (Register/Login)
- ✅ Home page with featured foods
- ✅ Browse food items by category
- ✅ Explore menu with various food options
- ✅ Add items to shopping cart
- ✅ View and manage cart
- ✅ Place orders with delivery address
- ✅ Payment verification
- ✅ Track order history
- ✅ View order status
- ✅ App download promotion
- ✅ Responsive navbar and footer

### 🛠️ Admin Features
- ✅ Add new food items with images
- ✅ View list of all food items
- ✅ Edit/Update food details
- ✅ Delete food items
- ✅ View all orders
- ✅ Update order status
- ✅ Track order delivery
- ✅ Image upload for food items
- ✅ Admin dashboard

### 🔧 Backend Features
- ✅ JWT-based authentication
- ✅ MongoDB database
- ✅ RESTful API
- ✅ Payment integration (Stripe)
- ✅ File upload handling (Multer)
- ✅ Error handling & logging
- ✅ CORS enabled
- ✅ Input validation
- ✅ User, Food, Cart, Order management APIs

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React** | UI Framework |
| **Vite** | Build tool |
| **React Router** | Client-side routing |
| **Context API** | State management |
| **CSS3** | Styling |
| **Axios** | HTTP client |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM |
| **JWT** | Authentication |
| **Stripe** | Payment processing |
| **Multer** | File upload |
| **bcryptjs** | Password hashing |

### Tools & Libraries
| Technology | Purpose |
|-----------|---------|
| **Vite** | Build tool and dev server |
| **Axios** | HTTP client for API calls |
| **Multer** | File upload handling |
| **bcryptjs** | Password hashing |
| **jsonwebtoken** | JWT token generation |
| **mongoose** | MongoDB object modeling |
| **dotenv** | Environment variable management |

---

## 📁 Project Structure

```
Food-Delivery/
├── Frontend/                      # React frontend application
│   ├── src/
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # Entry point
│   │   ├── index.css             # Global styles
│   │   ├── assets/               # Images, icons, assets
│   │   ├── Component/            # Reusable components
│   │   │   ├── Navbar/
│   │   │   ├── Header/
│   │   │   ├── ExploreMenu/
│   │   │   ├── FoodDisplay/
│   │   │   ├── FoodItem/
│   │   │   ├── LoginPopup/
│   │   │   ├── Footer/
│   │   │   └── AppDownload/
│   │   ├── Context/              # State management (Context API)
│   │   │   └── StoreContext.jsx
│   │   └── pages/                # Page components
│   │       ├── Home/
│   │       ├── Cart/
│   │       ├── MyOrders/
│   │       ├── PlaceOrder/
│   │       └── Verify/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── Flow.md                   # Frontend documentation
│
├── Backend/                       # Node.js backend API
│   ├── server.js                 # Application entry point
│   ├── api/
│   │   └── index.js              # Express app setup
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   │   └── constants.js          # Constants & configurations
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── foodController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── foodModel.js
│   │   ├── orderModel.js
│   │   └── cartModel.js (if exists)
│   ├── routes/
│   │   ├── userRoute.js
│   │   ├── foodRoute.js
│   │   ├── cartRoute.js
│   │   └── orderRoute.js
│   ├── middleware/
│   │   └── auth.js               # Authentication middleware
│   ├── utils/
│   │   ├── logger.js             # Logging utility
│   │   └── errorHandler.js       # Error handling utilities
│   ├── uploads/                  # User uploaded food images
│   ├── admin/                    # Admin panel (React + Vite)
│   │   ├── src/
│   │   │   ├── App.jsx
│   │   │   ├── main.jsx
│   │   │   ├── pages/
│   │   │   │   ├── Add/          # Add food page
│   │   │   │   ├── List/         # Food list page
│   │   │   │   └── Orders/       # Orders page
│   │   │   ├── components/
│   │   │   └── assets/
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   ├── index.html
│   │   └── flow.md               # Admin documentation
│   ├── package.json
│   ├── .env.example              # Environment template
│   ├── README.md                 # Backend documentation
│   ├── API_DOCUMENTATION.md      # API reference
│   ├── DEVELOPMENT.md            # Development guide
│   ├── IMPROVEMENTS.md           # Improvements summary
│   ├── Flow.md                   # Backend setup flow
│   └── vercel.json               # Vercel deployment config
│
└── README.md                      # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account
- Stripe account (for payments)

### 1. Clone Repository

```bash
git clone <repository-url>
cd Food-Delivery
```

### 2. Backend Setup

```bash
cd Backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your credentials
# (MongoDB URL, Stripe keys, JWT secret, etc.)

# Start development server
npm run dev

# Server runs on http://localhost:4000
```

### 3. Frontend Setup

```bash
cd ../Frontend

# Install dependencies
npm install

# Create environment file (if needed)
# Update API_URL in code to match backend URL

# Start development server
npm run dev

# Frontend runs on http://localhost:5173
```

### 4. Admin Panel Setup

```bash
cd ../Backend/admin

# Install dependencies
npm install

# Start admin panel development server
npm run dev

# Admin panel runs on http://localhost:5174
```

---

## ⚙️ Configuration

### Environment Variables

#### Backend (`.env`)

```env
# Database
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/food_delivery

# Server
PORT=4000
NODE_ENV=development

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx

# Frontend URLs
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
PRODUCTION_FRONTEND_URL=https://yourdomain.com
PRODUCTION_ADMIN_URL=https://admin.yourdomain.com

# JWT
JWT_SECRET=your_secret_key_here

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

#### Frontend (`.env` or `vite.config.js`)

```javascript
// Configure API endpoint
const API_URL = import.meta.env.DEV 
  ? 'http://localhost:4000' 
  : 'https://api.yourdomain.com'
```

---

## 💻 Development

### Starting Development Servers

**Terminal 1 - Backend:**
```bash
cd Backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
```

**Terminal 3 - Admin (Optional):**
```bash
cd Backend/admin
npm run dev
```

### Development Guides

- **Backend Development:** See [Backend/DEVELOPMENT.md](Backend/DEVELOPMENT.md)
- **Frontend Development:** See [Frontend/Flow.md](Frontend/Flow.md)
- **Admin Development:** See [Backend/admin/flow.md](Backend/admin/flow.md)

---

## 📖 Documentation

### Backend Documentation
- [Backend README](Backend/README.md) - Backend overview & setup
- [API Documentation](Backend/API_DOCUMENTATION.md) - Complete API reference
- [Deployment Guide](Backend/DEPLOYMENT.md) - Production deployment
- [Development Guide](Backend/DEVELOPMENT.md) - Development workflow

### Frontend Documentation
- [Frontend Flow](Frontend/Flow.md) - Frontend setup & structure
- [Admin Flow](Backend/admin/flow.md) - Admin panel setup & structure

---

## � API Endpoints

### User Endpoints
```
POST   /api/user/register    - Register new user
POST   /api/user/login       - Login user
GET    /api/user/profile     - Get user profile
```

### Food Endpoints
```
GET    /api/food/list        - Get all foods
POST   /api/food/add         - Add food (Admin)
PUT    /api/food/:id         - Update food (Admin)
DELETE /api/food/:id         - Delete food (Admin)
```

### Cart Endpoints
```
GET    /api/cart             - Get cart
POST   /api/cart/add         - Add to cart
PUT    /api/cart/remove      - Remove from cart
PUT    /api/cart/update      - Update quantity
```

### Order Endpoints
```
POST   /api/order/place      - Place order
GET    /api/order/list       - Get user orders
GET    /api/order/all        - Get all orders (Admin)
PUT    /api/order/status     - Update status (Admin)
```

**Full API Documentation:** See [Backend/API_DOCUMENTATION.md](Backend/API_DOCUMENTATION.md)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the ISC License.
