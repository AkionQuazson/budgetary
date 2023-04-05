import { createContext, useState } from "react";

const BudgetContext = createContext({
    income: 0,
    budgets: {}
});

export const BudgetContextProvider = (props) => {
    const [income, setIncome] = useState(0.00);
    const [budgets, setBudgets] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [mode, setMode] = useState('add');

    
    const contextValue = {
        income,
        budgets,
        transactions,
        mode,
        adjustIncome: (number) => {
            setIncome(number);
        },
        editBudgets: (change) => {
            const {type, target, payload} = change;

            let modBudgets = [...budgets];
            switch(type) {
                case 'add': 
                    modBudgets.push(payload)
                    setBudgets(modBudgets);
                    break;
                case 'remove':
                    modBudgets.splice(target, 1);
                    setBudgets(modBudgets);
                    break;
                case 'change':
                    modBudgets.splice(target, 1, payload);
                    setBudgets(modBudgets);
                    break;
                default:
                    console.log('undefined action');
            }
        },
        addTransaction: (payload) => {
            const tempTransactions = [...transactions, payload]
            setTransactions(tempTransactions);
            console.log(tempTransactions)
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