import BudgetCard from '../cards/BudgetCard';
import '../../styles/home.css'

const Home = (props) => {
    const budgetList = [<BudgetCard/>, <BudgetCard/>, <BudgetCard/>]
    return <div className='home'>
        <div className='budget-list'>
            {budgetList}
        </div>
        <div className='total-budget'> 2,600/3,000</div>
    </div>
}

export default Home;