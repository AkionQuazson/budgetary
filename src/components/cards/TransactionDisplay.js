

const TransactionDisplay = (props) => {
    const {budget, subBudget, value, description} = props
    return <div>
        {subBudget}
        {value}
        {description}
    </div>
}

export default TransactionDisplay;