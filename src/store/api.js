

export const api = {
    getBudgets:() => {
        let budgets = localStorage.getItem('budgets');
        let transactions = localStorage.getItem('transactions');
        budgets = JSON.parse(budgets);
        transactions = JSON.parse(transactions);
        return {budgets, transactions};
    },
    postBudgets:(budgets, transactions, income) => {
        localStorage.setItem('budgets', JSON.stringify(budgets));
        localStorage.setItem('transactions', JSON.stringify(transactions));
        localStorage.setItem('income', income)
    },
    getLogin:() => {

    },
    postLogin: () => {

    }
};

export default api;