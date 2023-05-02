import axios from 'axios';
import '../../styles/transactionCard.css'
import { useContext } from 'react';
import BudgetContext from '../../store/budgetContext';

const TransactionDisplay = (props) => {
    const {id, subBudget, amount, description} = props
    const {setError} = useContext(BudgetContext);
    
    const deleteTransaction = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:4005/transactions/${id}`)
        .then(() => {}).catch((err) => {setError(err)})
    }

    return <div className='tranCard'>
        <h3>{subBudget.name}</h3>
        <p className='value'>{amount}</p>
        <p>{description}</p>
        <button onClick={(e) => deleteTransaction(e)}>X</button>
    </div>
}

export default TransactionDisplay;