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
        adjustIncome: (number) => {
            setIncome(number);
            api.postBudgets(budgets, transactions, number);
        },
        editBudgets: (change) => {
            const {type, target, payload} = change;

            let modBudgets = [...budgets];
            switch(type) {
                case 'add': 
                    modBudgets.push(payload)
                    setBudgets(modBudgets);
                    api.postBudgets(modBudgets, transactions, income);
                    break;
                case 'remove':
                    modBudgets.splice(target, 1);
                    setBudgets(modBudgets);
                    api.postBudgets(modBudgets, transactions, income);
                    break;
                case 'change':
                    modBudgets.splice(target, 1, payload);
                    setBudgets(modBudgets);
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
        }
    }

    return <BudgetContext.Provider value={contextValue}>
        {props.children}
    </BudgetContext.Provider>
}

export default BudgetContext;