import { createContext, useState } from "react";

const BudgetContext = createContext({
    income: 0,
    budgets: {}
});

export const BudgetContextProvider = (props) => {
    const [income, setIncome] = useState(0.00);
    const [budgets, setBudgets] = useState({});

    
    const contextValue = {
        income,
        budgets,
        adjustIncome: (number) => {
            setIncome(number);
        },
        editBudgets: (change) => {
            const {type, target, payload} = change;

            let modBudgets = {...budgets};
            switch(type) {
                case 'add': 
                    setBudgets({...budgets, target});
                    break;
                case 'remove':
                    delete modBudgets[target];
                    setBudgets(modBudgets);
                    break;
                case 'change':
                    modBudgets[target] = payload;
                    setBudgets(modBudgets);
                    break;
                default:
                    console.log('undefined action');
            }
        }
    }

    return <BudgetContext.Provider value={contextValue}>
        {props.children}
    </BudgetContext.Provider>
}

export default BudgetContext;