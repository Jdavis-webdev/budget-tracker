import React, { useState } from "react";
import "../styles/AddTransaction.css";

const AddTransaction = ({ onAdd }) => {
    const [text, setText] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text || !amount) return;

        onAdd({ text, amount: parseFloat(amount) });
        setText("");
        setAmount("");
    };

    return (
        <div className="transaction-form">
            <h3>Add Transaction</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter transaction name"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddTransaction;
