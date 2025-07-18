# Wishlist App Frontend

This is the frontend for the Wishlist App, built with React, Vite, Tailwind CSS, shadcn/ui, and Axios.

### note : 
``
node version should be >= 20
``
## 🚀 Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5173` by default.

## 🗂️ Folder Structure

- `src/components/`
  - `layout/` — Layout components (Header, PageHeader)
  - `wishlist/` — Wishlist-related components (WishlistCard, WishlistGrid, CreateWishlistModal)
  - `product/` — Product-related components (ProductCard)
  - `auth/` — Authentication components (AuthForm)
  - `common/` — Reusable UI components (EmptyState, ErrorAlert)
  - `ui/` — Base UI primitives (Button, Input, Card, Dialog)
- `src/pages/` — Main app pages (Home, Wishlist, Login, Signup)
- `src/hooks/` — Custom React hooks (useWishlists, useAuth)
- `src/context/` — React context providers (AuthContext)
- `src/lib/` — API wrappers (Axios)

---


# Wishlist App Backend

This is the backend API for the Wishlist App, built with Express.js and MongoDB.

## 🚀 Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd backend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Create a `.env` file in the backend directory with the following:
     ```env
     MONGODB_URI=mongodb://localhost:27017/wishlist
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```
4. **Start the server:**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000` by default.

## 📋 API Endpoints

### Auth
- `POST /api/user/signup` — Register a new user
- `POST /api/user/login` — Login and get a JWT token

### Wishlists (require JWT in `Authorization: Bearer <token>` header)
- `POST /api/wishlist` — Create a new wishlist
- `GET /api/wishlist` — Get all wishlists
- `POST /api/wishlist/:id/product` — Add a product to a wishlist
- `PUT /api/wishlist/:id/product/:productId` — Update a product in a wishlist
- `DELETE /api/wishlist/:id/product/:productId` — Remove a product from a wishlist


## 🛠 Tech Stack Used

### Frontend:
- React (Vite)
- Tailwind CSS
- shadcn/ui (UI components)
- lucide-react (icons)
- Axios
- React Router DOM
- Context API

### Backend:
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS, dotenv

---

## 🚀 Thoughts on Scaling / Improving the App

##### 🛍️ Shared Checkout Integration 
#### Link to multiple e-commerce APIs so the group can checkout shared items directly from their wishlist.

## 📦 Budget Tracker

##### Add a shared budget calculator that updates dynamically as items are added.

## 🎨 Theme Customization

###### Allow each group to choose a custom theme or background for their wishlist for a more personalized experience.

---
📹 **Demo Video**: [Click to watch on Google Drive](https://drive.google.com/file/d/1W6QFDT6Rt7w3uYFMdWIl6vtQIp7ghw2c/view?usp=sharing)

