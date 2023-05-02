import { useContext, useState } from 'react'
import BudgetContext from '../store/budgetContext'
import '../styles/transactionForm.css'
import axios from 'axios';

const CreateTransactionForm = (props) => {
    const {budget, color, subBudget, closeForm} = props;
    const [amount, setAmount] = useState(15);
    const [description, setDescription] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        const today = new Date();
        const year = today.getUTCFullYear();
        const month = today.getUTCMonth() + 1;
        const payload = {
            budgetId: budget.id,
            subBudgetId: subBudget.id,
            amount,
            description,
            month_applicable: `${year}-${month < 10 ? '0' : ''}${month}`
        };
        axios.post(`http://localhost:4005/transactions`, {...payload})
        closeForm({budget, subBudget, active:false})
    }

    return <div className="background" style={{backgroundColor:`${color}ad`}} onClick={()=>closeForm({budget, subBudget, active:false})} >
        <form 
            className="transaction" 
            onSubmit={(e) => {submitForm(e)}}
            onClick={(e) => {e.stopPropagation()}}
        >
            <h3>Add Transaction</h3>
            <div className='currency'>
                <span>$</span>
                <input type='number' min='0.00' step='1' value={amount} onChange={(e) => {setAmount(+e.target.value)}} />
            </div>
            <textarea name="descriptionArea" id="descriptionArea" placeholder='Description' rows={3} value={description} onChange={(e) => {setDescription(e.target.value)}} ></textarea>
            <input type="submit" />
        </form>
    </div>
}

export default CreateTransactionForm;