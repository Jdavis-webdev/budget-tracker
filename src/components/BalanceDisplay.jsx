import React from "react";
import "../styles/BalanceDisplay.css";

const BalanceDisplay = ({ transactions }) => {
    const total = transactions.reduce((acc, t) => acc + t.amount, 0);

    return (
        <div className="balance-container">
            <h2>Your Balance</h2>
            <p className={total >= 0 ? "positive-balance" : "negative-balance"}>
                ${total.toFixed(2)}
            </p>
        </div>
    );
};

export default BalanceDisplay;
