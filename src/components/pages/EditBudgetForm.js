import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import BudgetContext from "../../store/budgetContext";
import '../../styles/budgetForm.css'

const EditBudgetForm = (props) => {
    const {mode, editMode, editBudgets, budgets, budgetTarget} = useContext(BudgetContext);
    const currentBudget = budgets.find((bud) => {return bud.name === budgetTarget});
    const navigate = useNavigate();

    const [budgetName, setBudgetName] = useState('');
    const [maxValue, setMaxValue] = useState(0);
    const [color, setColor] = useState('#'+ Math.floor(Math.random() * 1000000));
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
    }, [currentBudget]);

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
            maxValue: +maxValue,
            currentSpent: 0,
            color,
            subBudgets
        }
        const change = {
            type: mode,
            payload: newBudget,
            target: null
        }
        editBudgets(change)
        navigate('/');
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


    return <form onSubmit={(e) => {createBudget(e)}}>
        <h2>New Budget</h2>
        <input type="text" id="budgetName" placeholder="BudgetName" value={budgetName} onChange={(e) => {setBudgetName(e.target.value)}}/>
        <div className="halfContainer">
            <div className="half">
            <div className='currency'>
                <span>$</span>
                <input type='number' min='0.00' step='.01' value={maxValue} onChange={(e) => setMaxValue(e.target.value)} />
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
}

export default EditBudgetForm;