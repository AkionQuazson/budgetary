import { NavLink } from 'react-router-dom';
import '../../styles/budgetCard.css';

const SubBudgetCard = (props) => {
    const {title, currentAmount, color} = props
    
    const tooDark = (col) => {
        const r = parseInt(col.charAt(1) + col.charAt(2), 16);
        const g = parseInt(col.charAt(3) + col.charAt(4), 16);
        const b = parseInt(col.charAt(5) + col.charAt(6), 16);
        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return (luma < 40)
    }

    return <div 
        className="card budget-card" 
        style={{backgroundColor: color, color: (tooDark(color) ? '#fff' : '#000')}} 
        onClick={(e) => {alert("Can't add transactions yet")}}
    >
        <h3>{title}</h3>
        <p>{currentAmount}</p>
    </div>
}

export default SubBudgetCard;