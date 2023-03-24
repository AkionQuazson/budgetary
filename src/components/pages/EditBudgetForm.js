import { useState } from "react";
import '../../styles/budgetForm.css'

const EditBudgetForm = (props) => {
    const [budgetName, setBudgetName] = useState('');
    const [maxValue, setMaxValue] = useState(0);
    const [color, setColor] = useState('#000000');
    const [subText, setSubText] = useState('');
    const [subBudgets, setSubBudgets] = useState([]);
    const {mode} = props

    const addSub = (e) => {
        e.preventDefault();
        let tempSubs = [...subBudgets];
        tempSubs.push({name:subText});
        setSubBudgets(tempSubs);
        
    }

    const createBudget = (e) => {
        e.preventDefault();
        const newBudget = {
            name: budgetName,
            maxValue: +maxValue,
            color,
            subBudgets
        }
        console.log(newBudget);
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
                {displaySub}
                <li><input type="text" onChange={(e) => setSubText(e.target.value)} value={subText} /><button onClick={(e) => {addSub(e)}}>+</button></li> 
            </ul>
        </div>
        <input type="submit" ></input>
    </form>
}

export default EditBudgetForm;