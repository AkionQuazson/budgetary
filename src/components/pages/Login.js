import { useState } from "react";
import '../../styles/loginForm.css'

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return <>
        <form>
            <h2>Login</h2>
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
        <button>Register instead?</button>
    </>
}

export default Login;