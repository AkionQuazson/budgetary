import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import BudgetContext from './budgetContext'

let logoutTimer;

const AuthContext = createContext({
  token: '',
  login: () => {},
  logout: () => {},
  userId: null,
  error: null
})

const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime()
  const expTime = exp 
  const remainingTime = expTime - currentTime
  return remainingTime
}

const getLocalData = () => {
  const storedToken = localStorage.getItem('token')
  const storedExp = localStorage.getItem('exp')

  const remainingTime = calculateRemainingTime(storedExp)

  if (remainingTime <= 1000 * 60 * 30) {
    localStorage.removeItem('token')
    localStorage.removeItem('exp')
    return null
  }


  return {
    token: storedToken,
    duration: remainingTime,
  }
}



export const AuthContextProvider = (props) => {
  const localData = getLocalData()

  let initialToken = null;
  if (localData) {
    initialToken = localData.token
  }

  const [token, setToken] = useState(initialToken)
  const [userId, setUserId] = useState(null)
  const [error, setError] = useState(null)

  const {adjustIncome} = useContext(BudgetContext);

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    if(logoutTimer) {
      logoutTimer.clearTimer();
    }
  }

  const login = ({token, income, exp, userId}) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem('token', token)
    localStorage.setItem('exp', exp)
    adjustIncome(income)

    const remainingTime = calculateRemainingTime(exp);
    logoutTimer = setTimeout(logout, remainingTime);
  }

  const contextValue = {
    token,
    login,
    logout, 
    userId,
    error,
    setError
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
