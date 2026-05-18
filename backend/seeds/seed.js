import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import User from "../src/models/User.js";
import CreditCard from "../src/models/CreditCard.js";
import Transaction from "../src/models/Transaction.js";
import Budget from "../src/models/Budget.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });
dotenv.config({ path: path.join(__dirname, "../../.env") });

const ENV_ALIASES = {
  dev: "development",
  development: "development",
  stg: "staging",
  staging: "staging",
  prod: "production",
  production: "production",
};

const DB_NAMES = {
  development: "fintrack-dev",
  staging: "fintrack-stg",
  production: "fintrack-prod",
};

const rawEnv =
  process.env.SEED_ENV || process.env.ENVIRONMENT || "development";
const ENVIRONMENT = ENV_ALIASES[rawEnv.toLowerCase()] || "development";

const DEMO_USERS = {
  development: [
    { email: "demo@dev.fintrack.io", password: "Demo@123", name: "Demo Admin" },
    { email: "user1@dev.fintrack.io", password: "User@123", name: "User One" },
    { email: "user2@dev.fintrack.io", password: "User@123", name: "User Two" },
  ],
  staging: [
    { email: "demo@stg.fintrack.io", password: "Demo@123", name: "Demo Staging" },
    { email: "user1@stg.fintrack.io", password: "User@123", name: "User Staging" },
    { email: "user2@stg.fintrack.io", password: "User@123", name: "User Two STG" },
  ],
  production: [
    {
      email: "demo@prod.fintrack.io",
      password: "Demo@123",
      name: "Demo Production",
    },
  ],
};

const DEMO_CARDS = [
  {
    cardName: "Personal Visa",
    cardNumber: "4532015112830366",
    cardType: "Visa",
    expiryDate: "12/25",
    creditLimit: 10000,
    currentBalance: 2500,
    color: "#3B82F6",
  },
  {
    cardName: "Rewards Mastercard",
    cardNumber: "5425233010103442",
    cardType: "Mastercard",
    expiryDate: "06/26",
    creditLimit: 15000,
    currentBalance: 4200,
    color: "#8B5CF6",
  },
  {
    cardName: "Travel Amex",
    cardNumber: "378282246310005",
    cardType: "Amex",
    expiryDate: "09/27",
    creditLimit: 8000,
    currentBalance: 1800,
    color: "#10B981",
  },
];

const TRANSACTION_DATA = {
  "Food & Dining": ["Grocery Store", "Restaurant", "Coffee Shop", "Food Delivery"],
  Shopping: ["Clothing Store", "Electronics", "Online Purchase", "Mall"],
  Transportation: ["Gas Station", "Taxi", "Public Transit", "Parking"],
  Entertainment: ["Movie Theater", "Streaming", "Concert", "Gaming"],
  "Bills & Utilities": ["Electricity", "Water", "Internet", "Phone"],
};

const DEMO_BUDGETS = [
  { category: "Food & Dining", limitAmount: 500 },
  { category: "Shopping", limitAmount: 300 },
  { category: "Transportation", limitAmount: 200 },
  { category: "Entertainment", limitAmount: 150 },
  { category: "Bills & Utilities", limitAmount: 1000 },
];

function resolveMongoUri() {
  const base = process.env.MONGODB_URI || "mongodb://localhost:27017";
  const dbName = DB_NAMES[ENVIRONMENT];
  const [uriBase, queryPart] = base.split("?");
  const query = queryPart ? `?${queryPart}` : "";
  const match = uriBase.match(/^(mongodb(\+srv)?:\/\/[^/]+)/);

  if (match) {
    return `${match[1]}/${dbName}${query}`;
  }

  return `${uriBase.replace(/\/$/, "")}/${dbName}${query}`;
}

async function seedDatabase() {
  const mongoUri = resolveMongoUri();

  try {
    console.log(`🌱 Seeding FinTrack (${ENVIRONMENT}) → ${mongoUri.replace(/\/\/[^:]+:[^@]+@/, "//***:***@")}`);

    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    await Promise.all([
      User.deleteMany({}),
      CreditCard.deleteMany({}),
      Transaction.deleteMany({}),
      Budget.deleteMany({}),
    ]);
    console.log("🗑️  Cleared existing data");

    const demoUsers = DEMO_USERS[ENVIRONMENT];
    const now = new Date();
    const month = now.toLocaleString("en-US", { month: "long" });
    const year = now.getFullYear();
    const createdUsers = [];

    for (const userData of demoUsers) {
      const user = await User.create({
        email: userData.email,
        password: userData.password,
        name: userData.name,
        currency: "USD",
        monthlyBudget: 3000,
      });
      createdUsers.push(user);
      console.log(`✅ Created user: ${user.email}`);
    }

    for (const [userIndex, user] of createdUsers.entries()) {
      const cardIds = [];

      for (const [cardIndex, cardData] of DEMO_CARDS.entries()) {
        const cardNumber = `${cardData.cardNumber.slice(0, -1)}${(userIndex + cardIndex) % 10}`;
        const card = await CreditCard.create({
          userId: user._id,
          cardName: cardData.cardName,
          cardNumber,
          cardHolder: user.name,
          expiryDate: cardData.expiryDate,
          cardType: cardData.cardType,
          creditLimit: cardData.creditLimit,
          currentBalance: cardData.currentBalance,
          color: cardData.color,
        });
        cardIds.push(card._id);
      }
      console.log(`  ✅ Created ${cardIds.length} cards for ${user.email}`);

      for (const cardId of cardIds) {
        for (let i = 0; i < 30; i++) {
          const categories = Object.keys(TRANSACTION_DATA);
          const category =
            categories[Math.floor(Math.random() * categories.length)];
          const merchants = TRANSACTION_DATA[category];
          const merchant =
            merchants[Math.floor(Math.random() * merchants.length)];

          const transactionDate = new Date();
          transactionDate.setDate(
            transactionDate.getDate() - Math.floor(Math.random() * 90),
          );

          await Transaction.create({
            userId: user._id,
            cardId,
            amount: Math.floor(Math.random() * 300) + 10,
            category,
            description: `${merchant} purchase`,
            merchant,
            transactionDate,
            status: Math.random() > 0.1 ? "Completed" : "Pending",
          });
        }
      }
      console.log(`  ✅ Created 90 transactions (30 per card)`);

      for (const budgetData of DEMO_BUDGETS) {
        await Budget.create({
          userId: user._id,
          category: budgetData.category,
          limitAmount: budgetData.limitAmount,
          spentAmount: Math.floor(Math.random() * budgetData.limitAmount),
          month,
          year,
        });
      }
      console.log(`  ✅ Created ${DEMO_BUDGETS.length} budgets`);
    }

    console.log("\n✨ Seed completed successfully!");
    console.log("\n📝 Demo credentials:");
    for (const user of demoUsers) {
      console.log(`   📧 ${user.email}`);
      console.log(`   🔑 ${user.password}`);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedDatabase();
