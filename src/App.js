import { useContext, useEffect, useState } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './components/pages/Home';
import EditBudgetForm from './components/pages/EditBudgetForm';
import ErrorModal from './components/pages/ErrorModal';
import Login from './components/pages/Login';
import Header from './components/Header';
import BudgetPage from './components/pages/BudgetPage';

import BudgetContext from './store/budgetContext';
import AuthContext from './store/loginContext';
import './styles/App.css'

function App() {
  const [error, setError] = useState(null);
  const {error: budgetError, setError: setBudgetError} = useContext(BudgetContext)
  const {error: loginError, setError: setLoginError} = useContext(AuthContext)

  useEffect(() => {
    if (loginError) setError(loginError);
    if (budgetError) setError(budgetError);
  }, [budgetError, loginError])

  const clearError = (e) => {
    e.preventDefault();
    setBudgetError(null);
    setLoginError(null);
    setError(null);
  }

  return (
    <div className="App">
      <Header />
      <div className='main'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/b/:budget' element={<BudgetPage/>} />
        <Route path='/edit' element={<EditBudgetForm/>} />
        <Route path='*' element={<Navigate to='/'/>} />
      </Routes>
      {error && <ErrorModal error={error} clearError={clearError} />}
      </div>
    </div>
  );
}

export default App;
