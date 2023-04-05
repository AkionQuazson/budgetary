import SubBudgetCard from '../cards/SubBudgetCard'
import { useParams } from 'react-router'
import { useContext, useState } from 'react'
import BudgetContext from '../../store/budgetContext'
import '../../styles/budgetPage.css'
import CreateTransactionForm from '../CreateTransactionForm'

const BudgetPage = () => {
    const params = useParams();
    const {budgets} = useContext(BudgetContext);
    const {budget} = params;
    const budgetData = budgets.find((bud) => {
        return bud.name === budget;
    });
    const {name, color, maxValue, currentSpent, subBudgets} = budgetData;

    const [transaction, setTransaction] = useState({active:true, budget, subBudget:null});

    let totalSpent = currentSpent;
    const displaySubBudgets = subBudgets.map((sub, i) => {
        totalSpent += sub.amountSpent;
        return <SubBudgetCard
            title={sub.name}
            currentAmount={sub.amountSpent}
            color={color}
            changeTransaction={setTransaction}
        />
    })

    return <>
        <div>
            <h2>{name}</h2>
            <h3>{totalSpent}/{maxValue}</h3>
            <div className='flexHorizontal'>
                {displaySubBudgets}
            </div>
        </div>
        {transaction.active && <CreateTransactionForm color={color} budget={transaction.budget} subBudget={transaction.subBudget} closeForm={setTransaction} />}
    </>
}

export default BudgetPage;