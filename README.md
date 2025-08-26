# ShopItUp – Frontend

This is the **React + Vite frontend** for the ShopItUp e-commerce platform.  

##  Tech
- React + Vite
- Redux Toolkit (state management)
- TailwindCSS / Bootstrap (styling)
- Axios (API requests)

## 🛠 Setup
```bash
cd frontend
npm install
npm run dev
```

# ShopItUp – Backend

This is the **Express + Node.js backend API** for the ShopItUp e-commerce platform.

## Tech
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Stripe API (payments)
- dotenv for environment configuration

##  Setup

### 1. Install dependencies
```bash
cd backend
npm install
```
2. Setup environment variables

Create a .env file inside backend/:

PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=your-stripe-secret-key

3. Run server
# Development
npm run dev

# Production
npm start
