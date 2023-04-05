import { useContext, useState } from 'react'
import BudgetContext from '../store/budgetContext'
import '../styles/transactionForm.css'

const CreateTransactionForm = (props) => {
    const {budget, color, subBudget, closeForm} = props;
    const {addTransaction} = useContext(BudgetContext);
    const [value, setValue] = useState(15);
    const [description, setDescription] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        const payload = {
            budget,
            subBudget,
            value,
            description
        };
        addTransaction(payload);
        closeForm({budget, subBudget, active:false})
    }

    return <div className="background" style={{backgroundColor:`${color}ad`}} >
        <form className="transaction" onSubmit={(e) => {submitForm(e)}}>
            <h3>Add Transaction</h3>
            <div className='currency'>
                <span>$</span>
                <input type='number' min='0.00' step='.01' value={value} onChange={(e) => {setValue(e.target.value)}} />
            </div>
            <textarea name="descriptionArea" id="descriptionArea" placeholder='Description' rows={3} value={description} onChange={(e) => {setDescription(e.target.value)}} ></textarea>
            <input type="submit" />
        </form>
    </div>
}

export default CreateTransactionForm;