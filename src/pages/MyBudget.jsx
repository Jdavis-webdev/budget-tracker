import React from "react";
import BudgetChart from "../components/BudgetChart";

const MyBudget = () => {
  const transactions = [
    { text: "Food & Dining", amount: -50 },
    { text: "Housing & Rent", amount: -800 },
    { text: "Entertainment", amount: -30 },
    { text: "Miscellaneous", amount: -40 },
  ];

  return (
    <div className="page-container">
      <h1>My Budget</h1>
      <BudgetChart transactions={transactions} />
    </div>
  );
};

export default MyBudget;
