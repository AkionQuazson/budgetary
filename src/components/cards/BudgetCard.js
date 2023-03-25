import { NavLink } from 'react-router-dom';
import '../../styles/budgetCard.css';

const BudgetCard = (props) => {
    const {title, currentAmount, maxAmount, color} = props
    
    const tooDark = (col) => {
        const r = parseInt(col.charAt(1) + col.charAt(2), 16);
        const g = parseInt(col.charAt(3) + col.charAt(4), 16);
        const b = parseInt(col.charAt(5) + col.charAt(6), 16);
        console.log({r,g,b})
        return (r < 100 && g < 100 && b < 100)
    }

    return <NavLink className="card budget-card" style={{backgroundColor: color, color: (tooDark(color) ? '#fff' : '#000')}} to={`/b/${title}`}>
            <h3>{title}</h3>
            <p className={(currentAmount > maxAmount) ? 'above-max' : ''}>{currentAmount}/{maxAmount}</p>
    </NavLink>
}

export default BudgetCard;