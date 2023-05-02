import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import BudgetContext from "../../store/budgetContext";
import '../../styles/budgetForm.css'
import axios from "axios";
import AuthContext from "../../store/loginContext";

const EditBudgetForm = (props) => {
    const {mode, editMode, editBudgets, budgets, budgetTarget, setError} = useContext(BudgetContext);
    const {userId} = useContext(AuthContext)
    const currentBudget = budgets.find((bud) => {return bud.name === budgetTarget});
    const navigate = useNavigate();

    const [budgetName, setBudgetName] = useState('');
    const [maxValue, setMaxValue] = useState(0);
    const [color, setColor] = useState('#'+ Math.floor(Math.random() * 16777215).toString(16));
    const [subText, setSubText] = useState('');
    const [subBudgets, setSubBudgets] = useState([]);

    useEffect(() => {
        if (currentBudget) {
            setBudgetName(currentBudget.name);
            setMaxValue(currentBudget.maxValue);
            setColor(currentBudget.color);
            setSubBudgets(currentBudget.subBudgets);
            editMode('change');
        }
        else {
            editMode('add')
        }
    }, [currentBudget, editMode]);

    const addSub = (e) => {
        e.preventDefault();
        if(subText.trim() === '') {
            setSubText('');
            return;
        }
        let tempSubs = [...subBudgets];
        tempSubs.push({name:subText, amountSpent:0});
        setSubBudgets(tempSubs);
        setSubText('');
    }

    const createBudget = (e) => {
        e.preventDefault();
        if(budgetName.trim === '' || +maxValue <= 0) {
            alert('Give a name and max value');
            return;
        }
        const newBudget = {
            name: budgetName,
            amount: +maxValue,
            currentSpent: 0,
            color,
            subBudgets
        }
        const change = {
            type: 'add',
            payload: newBudget,
            target: null
        }
        editBudgets(change)
        navigate('/');
    }

    const editBudget = (e) => {
        e.preventDefault();
        const update = {
            name: budgetName,
            amount: +maxValue,
            color,
            subBudgets
        }
        axios.put(`http://localhost:4005/budgets`, {...update, budgetTarget})
        navigate('/');
    }

    const deleteBudget = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:4005/budgets`, {budgetTarget, userId})
        .then (() => {
            navigate('/');
        })
        .catch((err) => {
            setError(err);
        })
    }

    const deleteSubBudget = (e) => {
        e.preventDefault()
        const id = +e.target.parentNode.id[9];
        let tempSubs = [...subBudgets]
        tempSubs.splice(id, 1)
        setSubBudgets(tempSubs)
    }

    const displaySub = subBudgets.map((sub, i) => {
        return <li id={'subBudget' + i} key={i}>{sub.name + '  '}<button className="deleteButton" onClick={(e) => {deleteSubBudget(e)}}>X</button></li>
    })


    return <div className="background" onClick={(e) => navigate('/')}>
    <form 
        onSubmit={(e) => {mode === 'add' ? createBudget(e) : editBudget(e)}}
        onClick={(e) => e.stopPropagation()}
    >
        <h2>New Budget</h2>
        <input type="text" id="budgetName" placeholder="BudgetName" value={budgetName} onChange={(e) => {setBudgetName(e.target.value)}}/>
        <div className="halfContainer">
            <div className="half">
            <div className='currency'>
                <span>$</span>
                <input type='number' min='0.00' step='1' value={maxValue} onChange={(e) => setMaxValue(e.target.value)} />
            </div>
                <input type="color" id="color" onChange={(e) => {setColor(e.target.value)}} value={color} />
            </div>
            <ul className="half" >
                <li><input type="text" onChange={(e) => setSubText(e.target.value)} value={subText} /><button onClick={(e) => {addSub(e)}}>+</button></li> 
                {displaySub}
            </ul>
        </div>
        <input type="submit" ></input>
    </form>
    </div>
}

export default EditBudgetForm;