import React, { useState, useEffect } from "react";
import { Grid2, Card, CardContent, Typography } from "@mui/material";
import BalanceDisplay from "../components/BalanceDisplay";
import BudgetChart from "../components/BudgetChart";
import TransactionList from "../components/TransactionList";
import AddTransaction from "../components/AddTransaction";
import LinkedAccounts from "../components/LinkedAccounts";
import "../styles/Home.css";

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [linkedAccounts, setLinkedAccounts] = useState([]);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);

    const storedAccounts = JSON.parse(localStorage.getItem("linkedAccounts")) || [];
    setLinkedAccounts(storedAccounts);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("linkedAccounts", JSON.stringify(linkedAccounts));
  }, [transactions, linkedAccounts]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const updateTransaction = (index, updatedTransaction) => {
    const updatedTransactions = transactions.map((t, i) =>
      i === index ? updatedTransaction : t
    );
    setTransactions(updatedTransactions);
  };

  const deleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
  };

  const addAccount = (account) => {
    setLinkedAccounts([...linkedAccounts, account]);
  };

  return (
    <div className="home-container">
      <Typography variant="h4" className="home-title">
        Budget Dashboard
      </Typography>

      <Grid2 container spacing={3} className="grid-container">
        {/* Balance Display */}
        <Grid2 item xs={12} md={4}>
          <Card className="card">
            <CardContent>
              <BalanceDisplay transactions={transactions} />
            </CardContent>
          </Card>
        </Grid2>

        {/* Budget Chart */}
        <Grid2 item xs={12} md={8}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="section-title">
                Spending Overview
              </Typography>
              <BudgetChart transactions={transactions} />
            </CardContent>
          </Card>
        </Grid2>

        {/* Add Transaction */}
        <Grid2 item xs={12} md={4}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="section-title">
                Add Expense / Income
              </Typography>
              <AddTransaction onAdd={addTransaction} />
            </CardContent>
          </Card>
        </Grid2>

        {/* Transaction List */}
        <Grid2 item xs={12} md={8}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="section-title">
                Recent Transactions
              </Typography>
              <TransactionList
                transactions={transactions}
                onUpdate={updateTransaction}
                onDelete={deleteTransaction}
              />
            </CardContent>
          </Card>
        </Grid2>

        {/* Linked Accounts */}
        <Grid2 item xs={12}>
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="section-title">
                Linked Bank Accounts & Cards
              </Typography>
              <LinkedAccounts accounts={linkedAccounts} onAdd={addAccount} />
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Home;
