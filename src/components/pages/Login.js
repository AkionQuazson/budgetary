import axios from 'axios';
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from '../../store/loginContext'
import '../../styles/loginForm.css'

const Login = (props) => {
    const loginCtx = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState('login');
    const navigate = useNavigate();

    const toggleMode = () => {
        if(mode === 'login') {
            setMode('register');
        }
        else {
            setMode('login');
        }
    }

    const submmitData = (e) => {
        e.preventDefault();
        const dataToSend = {username, password};
        axios.post(`http://localhost:4005/${mode}`, dataToSend)
            .then(({data}) => {
                loginCtx.login(data)
                navigate('/')
            })
            .catch((err) => {
                setPassword('');
                loginCtx.setError(err);
            })
    }

    return <>
        <form onSubmit={(e) => {submmitData(e)}}>
            <h2>{mode}</h2>
            <span>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={username} onChange={(e) => {setUsername(e.target.value)}} />
            </span>
            <span>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
            </span>
            <input type="submit" />
        </form>
        <button onClick={() => {toggleMode()}}>{mode === "login" ? "Register" : "Login"} instead?</button>
    </>
}

export default Login;