import React, { useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import { List, ListItem, ListItemText, Button } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import "../styles/LinkedAccounts.css";

const LinkedAccounts = ({ accounts, onAdd }) => {
    const [linkToken, setLinkToken] = useState("");

    useEffect(() => {
        fetch("/api/plaid/create_link_token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: "12345" }), // Replace with real user ID
        })
            .then((res) => res.json())
            .then((data) => setLinkToken(data.link_token));
    }, []);

    const { open, ready } = usePlaidLink({
        token: linkToken,
        onSuccess: async (public_token, metadata) => {
            const res = await fetch("/api/plaid/exchange_public_token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: "12345",
                    public_token,
                    institution: metadata.institution.name,
                    account_name: metadata.accounts[0].name,
                    balance: metadata.accounts[0].balances.available,
                }),
            });
            if (res.ok) {
                alert("Bank account linked!");
                window.location.reload();
            }
        },
    });

    return (
        <div className="linked-accounts-container">
            <List>
                {accounts.map((account, index) => (
                    <ListItem key={index} className="account-item">
                        {account.institution.includes("Bank") ? <AccountBalanceIcon className="icon" /> : <CreditCardIcon className="icon" />}
                        <ListItemText primary={account.institution} secondary={`$${account.balance.toFixed(2)}`} />
                    </ListItem>
                ))}
            </List>

            <Button variant="contained" color="primary" onClick={() => open()} disabled={!ready}>
                Link a Bank Account
            </Button>
        </div>
    );
};

export default LinkedAccounts;
