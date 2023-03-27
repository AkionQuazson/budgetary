import { useState } from "react";
import { useNavigate } from "react-router";
import '../../styles/loginForm.css'

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState('Login');
    const navigate = useNavigate();

    const toggleMode = () => {
        if(mode === 'Login') {
            setMode('Register');
        }
        else {
            setMode('Login');
        }
    }

    const submmitData = (e) => {
        e.preventDefault();
        const dataToSend = {username, password, mode};
        console.log(dataToSend);
        navigate('/')
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
        <button onClick={() => {toggleMode()}}>{mode === "Login" ? "Register" : "Login"} instead?</button>
    </>
}

export default Login;