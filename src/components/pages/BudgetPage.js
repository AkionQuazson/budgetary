import SubBudgetCard from '../cards/SubBudgetCard'
import { useParams } from 'react-router'
import { useContext } from 'react'
import BudgetContext from '../../store/budgetContext'
import '../../styles/budgetPage.css'

const BudgetPage = () => {
    const params = useParams();
    const {budgets} = useContext(BudgetContext);
    const {budget} = params;
    const budgetData = budgets.find((bud) => {
        return bud.name === budget;
    });
    const {name, color, maxValue, subBudgets} = budgetData;

    let totalSpent = 0;
    const displaySubBudgets = subBudgets.map((sub, i) => {
        totalSpent += sub.amountSpent;
        return <SubBudgetCard
            title={sub.name}
            currentAmount={sub.amountSpent}
            color={color}
        />
    })

    return <div>
        <h2>{name}</h2>
        <h3>{totalSpent}/{maxValue}</h3>
        <div className='flexHorizontal'>
            {displaySubBudgets}
        </div>
    </div>
}

export default BudgetPage;