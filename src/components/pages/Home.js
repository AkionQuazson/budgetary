import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import BudgetCard from '../cards/BudgetCard';
import BudgetContext from '../../store/budgetContext';
import '../../styles/home.css'

const Home = (props) => {
    const {income, adjustIncome, budgets} = useContext(BudgetContext);

    const budgetList = [<BudgetCard title="asdf"/>, <BudgetCard title="fdsa"/>, <BudgetCard title="qwerty"/>]
    const {totalSpent, totalBudgeted} = {totalSpent: 1500, totalBudgeted: 1800}

    return <div className='home'>
        <div className='total-budget'> 
            <h3>Monthly Income</h3>
            <div className='income'>
                <span>$</span>
                <input type='number' id='income' min='0.00' step='.01' value={income} onChange={(e) => adjustIncome(e.target.value)} />
            </div>
            <h3>Amount Budgeted</h3>
            <p className={(totalBudgeted > income) ? 'above-max' : ''}>{totalBudgeted}/{income}</p>
            <h3>Budgeted Amount Spent</h3>
            <p className={(totalSpent > totalBudgeted || totalSpent > income) ? 'above-max' : ''}>{totalSpent}/{totalBudgeted}</p>
        </div>
        <div className='budget-list'>
            {budgetList}
        </div>
        <NavLink className='addButton' to="/edit">+</NavLink>
        {/* <button className='addButton' onClick={(e) => addBudget(e)}>+</button> */}
    </div>
}

export default Home;