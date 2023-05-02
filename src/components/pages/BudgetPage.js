import { useNavigate, useParams } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import BudgetContext from '../../store/budgetContext';
import AuthContext from '../../store/loginContext';
import SubBudgetCard from '../cards/SubBudgetCard';
import CreateTransactionForm from '../CreateTransactionForm';
import TransactionDisplay from '../cards/TransactionDisplay';

import '../../styles/budgetPage.css';

const BudgetPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState({active:false, budget:null, subBudget:null});
    const [budgetData, setBudgetData] = useState({budget_name:'', color:'#ffffff'});
    const [subBudgets, setSubBudgets] = useState([{name:'', amountSpent:0}]);
    const [transactionList, setTransactionList] = useState([{budget:'', subBudget:'', value:0, description:''}]);

    let {budget} = params;
    const {userId} = useContext(AuthContext);
    const {setError, targetBudget} = useContext(BudgetContext);

    useEffect(() => {
        axios.get(`http://localhost:4005/budgets/${userId}`)
        .then(({data}) => {
            const target = data.find((bud) => {
                return bud.budget_name === budget;
            })
            axios.get(`http://localhost:4005/subbudgets/${target.id}`)
            .then(({data}) => {
                const subBuds = data;
                axios.get(`http://localhost:4005/transactions/${target.id}`)
                .then(({data}) => {
                    setBudgetData(target);
                    setSubBudgets(subBuds);
console.log(data)
                    setTransactionList(data);
                })
                .catch((err) => {
                    setError(err);
                })
                })
            .catch((err) => {
                setError(err);
            })
        })
        .catch((err) => {
            setError(err);
        })
    }, [transaction])

    const editThisBudget = (e) => {
        targetBudget(budget);
        navigate('/edit');
    }

    const displayTransactions = transactionList.map((tran, i) => {
        console.log(tran)
        return <TransactionDisplay 
            key={i}
            id={tran.id}
            subBudget={subBudgets.find((sub) => sub.id===tran.subBudgetId)}
            amount={tran.amount}
            description={tran.description}
        />
    })


    const displaySubBudgets = subBudgets.map((sub, i) => {
        return <SubBudgetCard
            key={i}
            title={sub.name}
            subBudget={sub}
            budget={budgetData}
            currentAmount={sub.amount_used}
            color={budgetData.color}
            changeTransaction={setTransaction}
        />
    })

    return <>
    <div>
        <h2>{budgetData.budget_name}</h2>
        <h3>{budgetData.current_amount}/{budgetData.monthly_amount}</h3>
        <div className='flexHorizontal'>
            {displaySubBudgets}
        </div>
        <div>
            {displayTransactions}
        </div>
    </div>
    {transaction.active && <CreateTransactionForm color={budgetData.color} budget={transaction.budget} subBudget={transaction.subBudget} closeForm={setTransaction} />}
    {/* <button className="cornerButton" onClick={(e) => editThisBudget(e)} >Edit</button> */}
</>

}

export default BudgetPage;