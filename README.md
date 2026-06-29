# Shopping Site - MERN Stack Application

A full-stack e-commerce shopping website built with MongoDB, Express, React, and Node.js. Features separate portals for administrators and shoppers with complete shopping cart and checkout functionality.

## Features

### Shopper Portal
- Browse products with search and category filtering
- View product details
- Add products to shopping cart
- Manage cart items (update quantities, remove items)
- Complete checkout process with shipping address
- View order history

### Admin Portal
- Dashboard with statistics (total products, orders, revenue, pending orders)
- Manage products (create, read, update, delete)
- View all orders
- Update order status (pending, processing, shipped, delivered, cancelled)

### Authentication
- User registration and login
- Role-based access control (Admin/Shopper)
- JWT token-based authentication
- Protected routes

## Tech Stack

- **Frontend**: React 18, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens), bcryptjs

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** (local installation) OR **MongoDB Atlas** account (cloud database)

### Verify Prerequisites

Check if Node.js and npm are installed:

```bash
node --version
npm --version
```

## Initial Setup Guide

Follow these steps to get the application up and running:

### Step 1: Navigate to Project Directory

```bash
cd "Shopping site"
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

Wait for all packages to install. You should see a `node_modules` folder created in the backend directory.

### Step 3: Install Frontend Dependencies

Open a new terminal window (keep the backend terminal open) or navigate back:

```bash
cd ../frontend
npm install
```

Wait for all packages to install. You should see a `node_modules` folder created in the frontend directory.

### Step 4: Set Up MongoDB

You have two options for MongoDB:

#### Option A: Local MongoDB Installation

**Install MongoDB locally:**

- **macOS (using Homebrew):**
  ```bash
  brew tap mongodb/brew
  brew install mongodb-community
  brew services start mongodb-community
  ```

- **Linux (Ubuntu/Debian):**
  ```bash
  sudo apt-get install -y mongodb
  sudo systemctl start mongod
  sudo systemctl enable mongod
  ```

- **Windows:**
  Download and install from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

**Verify MongoDB is running:**
```bash
# macOS/Linux
mongosh

# Or check status
brew services list  # macOS
sudo systemctl status mongod  # Linux
```

#### Option B: MongoDB Atlas (Cloud - Recommended for Beginners)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (free tier available)
4. Create a database user (Database Access → Add New User)
5. Whitelist your IP address (Network Access → Add IP Address → Add Current IP Address)
6. Get your connection string (Connect → Connect your application → Copy connection string)

### Step 5: Configure Environment Variables

Create a `.env` file in the `backend`directory:

```bash
cd backend
touch .env
```

Add the following content to the `.env` file:

**For Local MongoDB:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shopping-site
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
NODE_ENV=development
```

**For MongoDB Atlas:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/shopping-site?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
NODE_ENV=development
```

**Important Notes:**
- Replace `<username>` and `<password>` with your MongoDB Atlas credentials
- Replace `your-super-secret-jwt-key-change-this-in-production-12345` with a strong, random secret key
- You can generate a secure JWT secret using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Step 6: Seed the Database (Recommended)

Populate the database with 20 sample products for testing:

```bash
cd backend
npm run seed
```

You should see output like:
```
Connected to MongoDB
Cleared existing products
Successfully seeded 20 products

Products by category:
  Electronics: 5 products
  Clothing: 3 products
  ...
Database seeded successfully!
```

**Note:** If you encounter connection errors, make sure MongoDB is running (local) or your MongoDB Atlas connection string is correct.

### Step 7: Verify Setup

Before starting the servers, verify everything is configured correctly:

1. ✅ Backend dependencies installed (`backend/node_modules` exists)
2. ✅ Frontend dependencies installed (`frontend/node_modules` exists)
3. ✅ `.env` file created in `backend` directory
4. ✅ MongoDB is running (local) or MongoDB Atlas connection string is valid
5. ✅ Database seeded (optional but recommended)

## Running the Application

Now that everything is set up, you can start the application:

### Start the Backend Server

**Terminal 1 - Backend:**

```bash
cd backend
npm start
```

For development with auto-reload (recommended):
```bash
npm run dev
```

You should see:
```
MongoDB Connected
Server running on port 5000
```

✅ Backend is running at `http://localhost:5000`

### Start the Frontend Development Server

**Terminal 2 - Frontend:**

Open a **new terminal window** (keep the backend terminal running):

```bash
cd frontend
npm start
```

The React development server will:
- Start on `http://localhost:3000`
- Automatically open in your default browser
- Hot-reload when you make changes

✅ Frontend is running at `http://localhost:3000`

### Quick Start Summary

```bash
# Terminal 1 - Backend
cd backend
npm install          # First time only
npm run dev

# Terminal 2 - Frontend (new terminal)
cd frontend
npm install          # First time only
npm start
```

**Both servers must be running simultaneously for the application to work!**

## First Time Usage

### 1. Create Your First Account

Once the application is running:

1. Open your browser and go to `http://localhost:3000`
2. Click on **"Register"** in the navigation bar
3. Fill in the registration form:
   - **Name**: Your full name
   - **Email**: Your email address
   - **Password**: At least 6 characters
   - **Role**: Choose either "Admin" or "Shopper"

### 2. Creating an Admin Account

To access admin features:

1. Navigate to the Register page (`http://localhost:3000/register`)
2. Fill in your details
3. **Select "Admin" as the role** from the dropdown
4. Click "Register"
5. You'll be automatically logged in

**Admin accounts can:**
- Access the admin dashboard
- Manage products (add, edit, delete)
- View and update all orders
- See sales statistics

### 3. Creating a Shopper Account

To shop and make purchases:

1. Navigate to the Register page (`http://localhost:3000/register`)
2. Fill in your details
3. **Select "Shopper" as the role** (this is the default)
4. Click "Register"
5. You'll be automatically logged in

**Shopper accounts can:**
- Browse products
- Add items to cart
- Complete checkout
- View order history

### 4. Test the Application

**As a Shopper:**
1. Browse products at `/products`
2. Click on any product to view details
3. Add products to your cart
4. Go to `/cart` to review items
5. Proceed to `/checkout` and complete an order
6. View your orders at `/orders`

**As an Admin:**
1. Access dashboard at `/admin`
2. Manage products at `/admin/products`
3. View all orders at `/admin/orders`
4. Update order statuses

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all active products (public)
- `GET /api/products/:id` - Get single product (public)
- `GET /api/products/admin/all` - Get all products including inactive (admin)
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user's cart (protected)
- `POST /api/cart/items` - Add item to cart (protected)
- `PUT /api/cart/items/:itemId` - Update cart item quantity (protected)
- `DELETE /api/cart/items/:itemId` - Remove item from cart (protected)
- `DELETE /api/cart` - Clear cart (protected)

### Orders
- `POST /api/orders` - Create order/checkout (protected)
- `GET /api/orders/my-orders` - Get user's orders (protected)
- `GET /api/orders/all` - Get all orders (admin)
- `GET /api/orders/:id` - Get single order (protected)
- `PUT /api/orders/:id/status` - Update order status (admin)

## Project Structure

```
Shopping site/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   └── orders.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Notes

- The checkout process currently marks payment as "paid" automatically. In production, integrate with a payment gateway (Stripe, PayPal, etc.)
- Product images use placeholder URLs. Replace with actual image URLs or implement image upload functionality
- The application uses JWT tokens stored in localStorage. For enhanced security, consider using httpOnly cookies
- MongoDB connection string can be changed to use MongoDB Atlas for cloud hosting

## Troubleshooting

### MongoDB Connection Issues

**Error: "MongoDB connection error"**

1. **For Local MongoDB:**
   ```bash
   # Check if MongoDB is running
   brew services list  # macOS
   sudo systemctl status mongod  # Linux
   
   # Start MongoDB if not running
   brew services start mongodb-community  # macOS
   sudo systemctl start mongod  # Linux
   ```

2. **For MongoDB Atlas:**
   - Verify your connection string in `.env` is correct
   - Check that your IP address is whitelisted in MongoDB Atlas
   - Ensure your database user credentials are correct
   - Make sure the cluster is running (not paused)

3. **Check your `.env` file:**
   - Ensure `MONGODB_URI` is set correctly
   - No extra spaces or quotes around the URI
   - For Atlas, replace `<username>` and `<password>` with actual values

### Port Already in Use

**Error: "Port 5000 is already in use" (Backend)**

1. Find what's using the port:
   ```bash
   # macOS/Linux
   lsof -i :5000
   
   # Windows
   netstat -ano | findstr :5000
   ```

2. Either:
   - Stop the process using port 5000, OR
   - Change the port in `backend/.env`:
     ```env
     PORT=5001
     ```
   - Update `frontend/package.json` proxy if you change the port:
     ```json
     "proxy": "http://localhost:5001"
     ```

**Error: "Port 3000 is already in use" (Frontend)**

React will automatically ask if you want to use port 3001. Type `Y` to confirm.

### Installation Issues

**Error: "npm install" fails**

1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

2. Delete `node_modules` and `package-lock.json`:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Try using a different Node.js version (v14, v16, or v18)

### CORS Issues

**Error: "CORS policy" in browser console**

- The backend is configured to allow requests from `http://localhost:3000`
- Make sure both servers are running
- Check that the frontend proxy in `package.json` points to the correct backend URL
- For production, update CORS settings in `backend/server.js`

### Database Seeding Issues

**Error: "Error seeding database"**

1. Ensure MongoDB is running and accessible
2. Check your `.env` file has the correct `MONGODB_URI`
3. Try running the seed script again:
   ```bash
   cd backend
   npm run seed
   ```

### Frontend Not Connecting to Backend

**Error: "Network Error" or "Cannot connect to API"**

1. Verify backend is running on port 5000
2. Check browser console for specific errors
3. Verify the proxy in `frontend/package.json`:
   ```json
   "proxy": "http://localhost:5000"
   ```
4. Restart both servers

### Still Having Issues?

1. Check that all dependencies are installed in both `backend` and `frontend`
2. Verify Node.js version: `node --version` (should be v14+)
3. Make sure MongoDB is accessible
4. Check that `.env` file exists and has correct values
5. Review the console/terminal output for specific error messages

## License

This project is open source and available for educational purposes.

