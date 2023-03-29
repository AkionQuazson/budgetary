import '../styles/transactionForm.css'

const CreateTransactionForm = (props) => {
    const {budget, subBudget} = props

    return <div className="background">
        <form className="transaction">
            <h3>Add Transaction</h3>
            <div className='currency'>
                <span>$</span>
                <input type='number' min='0.00' step='.01' defaultValue={15} />
            </div>
            <textarea name="descriptionArea" id="descriptionArea" placeholder='Description' rows={3}></textarea>
            <input type="submit" />
        </form>
    </div>
}

export default CreateTransactionForm;