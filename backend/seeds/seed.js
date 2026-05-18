// Seed script for FinTrack - generates demo data for each environment
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
require("dotenv").config();

// Import models
const User = require("../models/User");
const Card = require("../models/Card");
const Transaction = require("../models/Transaction");
const Budget = require("../models/Budget");

const ENVIRONMENT =
  process.env.SEED_ENV || process.env.ENVIRONMENT || "development";

// Demo users for each environment
const DEMO_USERS = {
  development: [
    {
      email: "demo@dev.fintrack.io",
      password: "Demo@123",
      name: "Demo Admin",
      role: "admin",
    },
    {
      email: "user1@dev.fintrack.io",
      password: "User@123",
      name: "User One",
      role: "viewer",
    },
    {
      email: "user2@dev.fintrack.io",
      password: "User@123",
      name: "User Two",
      role: "editor",
    },
  ],
  staging: [
    {
      email: "demo@stg.fintrack.io",
      password: "Demo@123",
      name: "Demo Staging",
      role: "admin",
    },
    {
      email: "user1@stg.fintrack.io",
      password: "User@123",
      name: "User Staging",
      role: "viewer",
    },
    {
      email: "user2@stg.fintrack.io",
      password: "User@123",
      name: "User Two STG",
      role: "viewer",
    },
  ],
  production: [
    {
      email: "demo@prod.fintrack.io",
      password: "Demo@123",
      name: "Demo Production",
      role: "viewer",
    },
  ],
};

// Demo cards
const DEMO_CARDS = [
  {
    cardNumber: "4532015112830366",
    cardType: "Visa",
    expiryDate: "12/25",
    cvv: "123",
    balance: 5000,
  },
  {
    cardNumber: "5425233010103442",
    cardType: "Mastercard",
    expiryDate: "06/26",
    cvv: "456",
    balance: 8500,
  },
  {
    cardNumber: "378282246310005",
    cardType: "American Express",
    expiryDate: "09/24",
    cvv: "7895",
    balance: 3200,
  },
];

// Transaction categories and sample names
const TRANSACTION_CATEGORIES = [
  "Food",
  "Shopping",
  "Transportation",
  "Entertainment",
  "Bills",
];
const TRANSACTION_DESCRIPTIONS = {
  Food: [
    "Grocery Store",
    "Restaurant",
    "Coffee Shop",
    "Food Delivery",
    "Farmer Market",
  ],
  Shopping: [
    "Clothing Store",
    "Electronics",
    "Book Store",
    "Mall",
    "Online Purchase",
  ],
  Transportation: [
    "Gas Station",
    "Taxi",
    "Public Transit",
    "Parking",
    "Car Rental",
  ],
  Entertainment: [
    "Movie Theater",
    "Concert",
    "Gaming",
    "Streaming",
    "Sports Event",
  ],
  Bills: ["Electricity", "Water", "Internet", "Phone", "Insurance"],
};

// Budget defaults
const DEMO_BUDGETS = [
  { category: "Food", limit: 500 },
  { category: "Shopping", limit: 300 },
  { category: "Transportation", limit: 200 },
  { category: "Entertainment", limit: 150 },
  { category: "Bills", limit: 1000 },
];

async function seedDatabase() {
  try {
    console.log(
      `🌱 Seeding FinTrack database for ${ENVIRONMENT} environment...`,
    );

    // Connect to MongoDB
    const mongoUri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/fintrack-dev";
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Card.deleteMany({}),
      Transaction.deleteMany({}),
      Budget.deleteMany({}),
    ]);
    console.log("🗑️  Cleared existing data");

    // Get demo users for current environment
    const demoUsers = DEMO_USERS[ENVIRONMENT] || DEMO_USERS.production;
    const createdUsers = [];

    // Create demo users
    for (const userData of demoUsers) {
      const hashedPassword = await bcryptjs.hash(userData.password, 10);
      const user = await User.create({
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        phone: "+1-555-0100",
        role: userData.role,
      });
      createdUsers.push(user);
      console.log(`✅ Created user: ${user.email}`);
    }

    // For each user, create cards, transactions, and budgets
    for (const user of createdUsers) {
      // Create demo cards
      const cardIds = [];
      for (const cardData of DEMO_CARDS) {
        const card = await Card.create({
          userId: user._id,
          cardNumber: cardData.cardNumber,
          cardType: cardData.cardType,
          expiryDate: cardData.expiryDate,
          cvv: cardData.cvv,
          balance: cardData.balance,
          lastUsed: new Date(),
        });
        cardIds.push(card._id);
      }
      console.log(`  ✅ Created ${cardIds.length} cards for ${user.email}`);

      // Create demo transactions
      for (const cardId of cardIds) {
        for (let i = 0; i < 30; i++) {
          const category =
            TRANSACTION_CATEGORIES[
              Math.floor(Math.random() * TRANSACTION_CATEGORIES.length)
            ];
          const descriptions = TRANSACTION_DESCRIPTIONS[category] || [];
          const description =
            descriptions[Math.floor(Math.random() * descriptions.length)] ||
            category;

          const date = new Date();
          date.setDate(date.getDate() - Math.floor(Math.random() * 90));

          await Transaction.create({
            userId: user._id,
            cardId,
            amount: Math.floor(Math.random() * 300) + 10,
            category,
            description,
            date,
            status: Math.random() > 0.1 ? "completed" : "pending",
          });
        }
      }
      console.log(`  ✅ Created 90 transactions (30 per card)`);

      // Create demo budgets
      for (const budgetData of DEMO_BUDGETS) {
        await Budget.create({
          userId: user._id,
          category: budgetData.category,
          limit: budgetData.limit,
          spent: Math.floor(Math.random() * budgetData.limit),
        });
      }
      console.log(`  ✅ Created ${DEMO_BUDGETS.length} budgets`);
    }

    console.log("\n✨ Seed completed successfully!");
    console.log("\n📝 Demo Credentials:");
    for (const user of demoUsers) {
      console.log(`   📧 ${user.email}`);
      console.log(`   🔑 ${user.password}`);
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
}

seedDatabase();
