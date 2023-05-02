import { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import BudgetCard from '../cards/BudgetCard';
import BudgetContext from '../../store/budgetContext';
import '../../styles/home.css'
import AuthContext from '../../store/loginContext';

const Home = (props) => {
    const {income, setIncome, targetBudget, adjustIncome, editBudgets, budgets, transactions, setError} = useContext(BudgetContext);
    const {userId} = useContext(AuthContext);

    useEffect(() => {
        targetBudget('');
    }, [targetBudget])

    useEffect(() => {
        axios.get(`http://localhost:4005/budgets/${userId}`)
        .then(({data}) => {
            editBudgets(data);
        })
        .catch((err) => {
            setError(err);
        })
    }, []);

    const totalSpent = transactions.reduce((t, v = 0) => {
        return t + v.value}, 0);
    let totalBudgeted = 0;
    const budgetList = budgets.map((bud, i) => {
        totalBudgeted += +bud.maxValue;
        const budSpent = transactions.filter((t) => t.budget === bud.name).reduce((t, v) => t + v.value, 0);
        return <BudgetCard
            title={bud.budget_name}
            key={i}
            currentAmount={bud.current_amount}
            maxAmount={bud.monthly_amount}
            color={bud.color}
         />
    })

    return <div className='home'>
        <div className='total-budget'> 
            <h3>Monthly Income</h3>
            <div className='currency'>
                <span>$</span>
                <input 
                    type='number' 
                    id='income' 
                    min='0.00' 
                    step='1' 
                    value={income} 
                    onChange={(e) => {setIncome(e.target.value)}}
                    onBlur={(e) => {adjustIncome(e.target.value)}} />
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