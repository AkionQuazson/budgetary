
const TransactionButton = (props) => {
    
    const addTransaction = (e) => {
        e.preventDefault();

    }

    return <button onClick={(e) => {addTransaction(e)}}>
        +
    </button>
}

export default Header;