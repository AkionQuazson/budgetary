import { useState } from "react";


const EditBudgetForm = (props) => {
    const [subBudgets, setSubBudgets] = useState([]);
    const {mode} = props

    const addSub = (e) => {
        e.preventDefault();
        let tempSubs = [...subBudgets];
        tempSubs.push({name:'asdf'});
        setSubBudgets(tempSubs);
    }

    const deleteBudget = (e) => {
        e.preventDefault()
        const id = +e.target.parentNode.id[9];
    }

    const displaySub = subBudgets.map((sub, i) => {
        return <li id={'subBudget' + i} key={i}>{sub.name}<button className="deleteButton" onClick={(e) => {deleteBudget(e)}}>X</button></li>
    })
    
    return <form>
        <h2>New Budget</h2>
        <input type="text" id="budgetName" />
        <div className="half">
            <input type="number" id="maxValue" />
            <input type="color" id="color" />
        </div>
        <ul className="half" >
            {displaySub}
            <li><input type="text" /><button onClick={(e) => {addSub(e)}}>+</button></li> 
        </ul>
    </form>
}

export default EditBudgetForm;