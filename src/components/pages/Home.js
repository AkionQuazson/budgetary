import { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import BudgetCard from '../cards/BudgetCard';
import BudgetContext from '../../store/budgetContext';
import '../../styles/home.css'

const Home = (props) => {
    const {income, targetBudget, adjustIncome, budgets, transactions} = useContext(BudgetContext);

    useEffect(() => {
        targetBudget('');
    }, [targetBudget])

    const totalSpent = transactions.reduce((t, v = 0) => {
        return t + v.value}, 0);
    let totalBudgeted = 0;
    const budgetList = budgets.map((bud, i) => {
        totalBudgeted += +bud.maxValue;
        const budSpent = transactions.filter((t) => t.budget === bud.name).reduce((t, v) => t + v.value, 0);
        return <BudgetCard
            title={bud.name}
            key={i}
            currentAmount={budSpent}
            maxAmount={bud.maxValue}
            color={bud.color}
         />
    })

    return <div className='home'>
        <div className='total-budget'> 
            <h3>Monthly Income</h3>
            <div className='currency'>
                <span>$</span>
                <input type='number' id='income' min='0.00' step='.01' value={income} onChange={(e) => {
                    adjustIncome(e.target.value);
                    console.log(e.target.value)
                }} />
            </div>
            <h3>Amount Budgeted</h3>
            <p className={(totalBudgeted > income) ? 'above-max' : ''}>{totalBudgeted}/{income}</p>
            <h3>Budgeted Amount Spent</h3>
            <p className={(totalSpent > totalBudgeted || totalSpent > income) ? 'above-max' : ''}>{totalSpent}/{totalBudgeted}</p>
        </div>
        <div className='budget-list'>
            {budgetList}
        </div>
        <NavLink className='cornerButton' to="/edit">+</NavLink>
    </div>
}

export default Home;