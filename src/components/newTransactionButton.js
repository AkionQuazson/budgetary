import { useContext } from "react";
import BudgetContext from "../store/budgetContext";

const NewTransactionButton = (props) => {
    const {budgets} = useContext(BudgetContext);
    const {budget, subBudget} = props;

    const addTransaction = (e) => {
        e.preventDefault();
        
    }

    return <button onClick={(e) => {addTransaction(e)}}>
        +
    </button>
}

export default NewTransactionButton;