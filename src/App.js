import { useState } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './components/pages/Home';
import EditBudgetForm from './components/pages/EditBudgetForm';
import ErrorModal from './components/pages/ErrorModal';
import Login from './components/pages/Login';
import Header from './components/Header';
import BudgetPage from './components/pages/BudgetPage';

function App() {
  const error = null;
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/b/:budget' element={<BudgetPage/>} />
        <Route path='/edit' element={<EditBudgetForm/>} />
        <Route path='*' element={<Navigate to='/'/>} />
      </Routes>
      {error && <ErrorModal/>}
    </div>
  );
}

export default App;
