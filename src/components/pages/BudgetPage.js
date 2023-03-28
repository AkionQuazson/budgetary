import SubBudgetCard from '../cards/SubBudgetCard'
import { useParams } from 'react-router'
import { useContext } from 'react'
import BudgetContext from '../../store/budgetContext'

const BudgetPage = () => {
    const params = useParams();
    const {budgets} = useContext(BudgetContext);
    const {budget} = params;
    const budgetData = budgets.find((bud) => {
        return bud.name === budget;
    });
    const {name, color, maxValue, subBudgets} = budgetData;


    const displaySubBudgets = subBudgets.map((sub, i) => {
        return <SubBudgetCard
            title={sub.name}
            currentAmount={0}
            color={color}
        />
    })

    return <div>
        <h2>{name}</h2>
        <h3>{"amountSpent"}/{maxValue}</h3>
        <div className='flexHorizontal'>
            {displaySubBudgets}
        </div>
    </div>
}

export default BudgetPage;