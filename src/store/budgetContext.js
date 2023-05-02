import { createContext, useContext, useEffect, useState } from "react";
import api from "./api";
import axios from "axios";
import AuthContext from "./loginContext";

const BudgetContext = createContext({
    income: 0,
    budgets: {}
});

export const BudgetContextProvider = (props) => {
    
    const [income, setIncome] = useState(0.00);
    const [budgets, setBudgets] = useState([]);
    const [budgetTarget, setBudgetTarget] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [mode, setMode] = useState('add');
    const [error, setError] = useState(null);
    
    const {userId} = useContext(AuthContext);

    const contextValue = {
        income,
        budgets,
        budgetTarget,
        transactions,
        mode,
        error,
        setIncome,
        adjustIncome: (income) => {
            setIncome(income);
            axios.put(`http://localhost:4005/income`, {income, userId})
        },
        editBudgets: (budgets) => {
            setBudgets(budgets);
            setBudgetTarget('');
        },
        targetBudget: (bud) => {
            setBudgetTarget(bud);
        },
        addTransaction: (payload) => {
            const tempTransactions = [...transactions, payload]
            setTransactions(tempTransactions);
            api.postBudgets(budgets, tempTransactions, income);
        },
        editMode: (newMode) => {
            setMode(newMode);
        },
        setError
    }

    return <BudgetContext.Provider value={contextValue}>
        {props.children}
    </BudgetContext.Provider>
}

export default BudgetContext;