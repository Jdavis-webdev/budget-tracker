import React, { useState } from "react";
import "../styles/TransactionList.css";

const TransactionList = ({ transactions, onUpdate, onDelete }) => {
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState("");
    const [editAmount, setEditAmount] = useState("");

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditText(transactions[index].text);
        setEditAmount(transactions[index].amount);
    };

    const handleUpdate = (index) => {
        if (!editText || !editAmount) return;
        onUpdate(index, { text: editText, amount: parseFloat(editAmount) });
        setEditIndex(null);
    };

    return (
        <div className="transaction-list">
            <h3>Transaction History</h3>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index} className={transaction.amount < 0 ? "expense" : "income"}>
                        {editIndex === index ? (
                            <div className="edit-transaction">
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                                <input
                                    type="number"
                                    value={editAmount}
                                    onChange={(e) => setEditAmount(e.target.value)}
                                />
                                <button onClick={() => handleUpdate(index)}>Save</button>
                            </div>
                        ) : (
                            <>
                                {transaction.text} <span>${transaction.amount.toFixed(2)}</span>
                                <button onClick={() => handleEdit(index)}>✏️</button>
                                <button onClick={() => onDelete(index)}>❌</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;
