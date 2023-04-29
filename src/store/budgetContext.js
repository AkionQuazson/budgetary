import { createContext, useEffect, useState } from "react";
import api from "./api";

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
    
    useEffect(()=> {
        const getData = api.getBudgets();
        if (getData.budgets) {
            setBudgets(getData.budgets);
        }
        if (getData.transactions) {
            setTransactions(getData.transactions);
        }
        setIncome(getData.income);
    }, []);
    
    const contextValue = {
        income,
        budgets,
        budgetTarget,
        transactions,
        mode,
        error,
        adjustIncome: (number) => {
            setIncome(number);
            api.postBudgets(budgets, transactions, number);
        },
        editBudgets: (change) => {
            let {type, target, payload} = change;
            
            let modBudgets = [...budgets];
            target = modBudgets.findIndex((bud) => {return bud.name === target});
            switch(type) {
                case 'add': 
                    modBudgets.push(payload)
                    setBudgets(modBudgets);
                    api.postBudgets(modBudgets, transactions, income);
                    break;
                case 'remove':
                    modBudgets.splice(target, 1);
                    //find all related transactions, and delete. Refactor into backend?
                    setBudgets(modBudgets);
                    api.postBudgets(modBudgets, transactions, income);
                    break;
                case 'change':
                    modBudgets.splice(target, 1, payload);
                    setBudgets(modBudgets);
                    //If a subbudget is deleted, find related transactions and remove the subbudget
                    api.postBudgets(modBudgets, transactions, income);
                    break;
                default:
                    console.log('undefined action');
            }
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