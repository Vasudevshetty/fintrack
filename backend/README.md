# Backend

Finance Tracker Backend API built with Express.js and MongoDB.

## Features

- User authentication (Register, Login)
- Credit card management
- Transaction tracking
- Budget management
- MongoDB integration

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```
MONGODB_URI=your_mongodb_uri
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
```

## Running the Server

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

## API Endpoints

### Authentication

- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get user profile (protected)
- PUT `/api/auth/profile` - Update user profile (protected)

### Credit Cards

- POST `/api/cards` - Create a credit card (protected)
- GET `/api/cards` - Get all credit cards (protected)
- GET `/api/cards/:id` - Get a specific card (protected)
- PUT `/api/cards/:id` - Update a card (protected)
- DELETE `/api/cards/:id` - Delete a card (protected)

### Transactions

- POST `/api/transactions` - Create a transaction (protected)
- GET `/api/transactions` - Get transactions (protected)
- GET `/api/transactions/:id` - Get a specific transaction (protected)
- PUT `/api/transactions/:id` - Update a transaction (protected)
- DELETE `/api/transactions/:id` - Delete a transaction (protected)

### Budgets

- POST `/api/budgets` - Create a budget (protected)
- GET `/api/budgets` - Get budgets (protected)
- GET `/api/budgets/:id` - Get a specific budget (protected)
- PUT `/api/budgets/:id` - Update a budget (protected)
- DELETE `/api/budgets/:id` - Delete a budget (protected)
