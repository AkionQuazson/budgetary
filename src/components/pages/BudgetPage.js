import SubBudgetCard from '../cards/SubBudgetCard'
import { useNavigate, useParams } from 'react-router'
import { useContext, useState } from 'react'
import BudgetContext from '../../store/budgetContext'
import '../../styles/budgetPage.css'
import CreateTransactionForm from '../CreateTransactionForm'
import TransactionDisplay from '../cards/TransactionDisplay'

const BudgetPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {budgets, transactions, targetBudget} = useContext(BudgetContext);
    const [transaction, setTransaction] = useState({active:false, budget:null, subBudget:null});
    const {budget} = params;
    const budgetData = budgets.find((bud) => {
        return bud.name === budget;
    });
    if (!budgetData) {
        navigate('/');
        return<div></div>;
    }
    const {name, color, maxValue, currentSpent, subBudgets} = budgetData;


    const editThisBudget = (e) => {
        targetBudget(budget);
        navigate('/edit');
    }

    let totalSpent = currentSpent;
    const displaySubBudgets = subBudgets.map((sub, i) => {
        totalSpent += sub.amountSpent;
        return <SubBudgetCard
            key={i}
            title={sub.name}
            budget={budget}
            currentAmount={sub.amountSpent}
            color={color}
            changeTransaction={setTransaction}
        />
    })

    const displayTransactions = transactions.filter((tran) => {
        return tran.budget === budget
    }).map((tran, i) => {
        return <TransactionDisplay 
            key={i}
            budget={tran.budget}
            subBudget={tran.subBudget}
            value={tran.value}
            description={tran.description}
        />
    })

    return <>
        <div>
            <h2>{name}</h2>
            <h3>{totalSpent}/{maxValue}</h3>
            <div className='flexHorizontal'>
                {displaySubBudgets}
            </div>
            <div>
                {displayTransactions}
            </div>
        </div>
        {transaction.active && <CreateTransactionForm color={color} budget={transaction.budget} subBudget={transaction.subBudget} closeForm={setTransaction} />}
        <button className="cornerButton" onClick={(e) => editThisBudget(e)} >Edit</button>
    </>
}

export default BudgetPage;