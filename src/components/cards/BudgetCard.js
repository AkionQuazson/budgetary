import { NavLink } from 'react-router-dom';
import '../../styles/budgetCard.css';

const BudgetCard = (props) => {
    const {title, currentAmount, maxAmount} = props
    return <NavLink className="card budget-card" to={`/b/${title}`}>
            <h3>{title}</h3>
            <p className={(currentAmount > maxAmount) ? 'above-max' : ''}>{currentAmount}/{maxAmount}</p>
    </NavLink>
}

export default BudgetCard;