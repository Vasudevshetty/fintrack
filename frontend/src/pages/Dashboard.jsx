import React, { useState, useEffect } from "react";
import { cardAPI, transactionAPI } from "../utils/api";
import { formatCurrency, getCategoryColor } from "../utils/helpers";
import { StatCard, BudgetProgressBar } from "../components/Stats";
import { LineChartComponent, PieChartComponent } from "../components/Charts";
import { TrendingUp, CreditCard, PieChart, AlertCircle } from "lucide-react";

export const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalSpent: 0,
    cardsCount: 0,
    transactionsCount: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [cardsRes, transRes] = await Promise.all([
        cardAPI.getCards(),
        transactionAPI.getTransactions({ limit: 100 }),
      ]);

      const cards = cardsRes.data.cards;
      const trans = transRes.data.transactions;

      // Calculate stats
      const totalSpent = trans.reduce((sum, t) => sum + t.amount, 0);
      const categoryMap = {};

      trans.forEach((t) => {
        if (!categoryMap[t.category]) {
          categoryMap[t.category] = 0;
        }
        categoryMap[t.category] += t.amount;
      });

      setStats({
        totalSpent,
        cardsCount: cards.length,
        transactionsCount: trans.length,
      });

      setTransactions(trans.slice(0, 5));

      // Prepare category data
      const categoryArray = Object.entries(categoryMap).map(
        ([name, value]) => ({
          name,
          value,
        }),
      );
      setCategoryData(categoryArray);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  const spendingTrend = [
    { name: "Week 1", value: Math.random() * 1000 },
    { name: "Week 2", value: Math.random() * 1000 },
    { name: "Week 3", value: Math.random() * 1000 },
    { name: "Week 4", value: Math.random() * 1000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 mt-2">Here's your financial overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={TrendingUp}
          title="Total Spent"
          value={formatCurrency(stats.totalSpent, user?.currency || "USD")}
          subtitle="This month"
          color="blue"
        />
        <StatCard
          icon={CreditCard}
          title="Cards"
          value={stats.cardsCount}
          subtitle="Active cards"
          color="purple"
        />
        <StatCard
          icon={PieChart}
          title="Transactions"
          value={stats.transactionsCount}
          subtitle="Total recorded"
          color="green"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartComponent
          data={spendingTrend}
          title="Weekly Spending Trend"
        />
        <PieChartComponent
          data={categoryData}
          title="Spending by Category"
          colors={categoryData.map((item) => getCategoryColor(item.name))}
        />
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          {transactions.length > 0 ? (
            transactions.map((trans) => (
              <div
                key={trans._id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                    style={{
                      backgroundColor: getCategoryColor(trans.category),
                    }}
                  >
                    <PieChart size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {trans.merchant}
                    </p>
                    <p className="text-sm text-gray-500">{trans.category}</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-800">
                  -{formatCurrency(trans.amount, user?.currency || "USD")}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">
              No transactions yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
