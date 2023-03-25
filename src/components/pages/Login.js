import { useState } from "react";
import '../../styles/loginForm.css'

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return <>
        <form>
            <h2>Login</h2>
            <input type="text" id="username" value={username} onChange={(e) => {setUsername(e.target.value)}} />
            <input type="password" id="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
            <input type="submit" />
        </form>
        <button>Register instead?</button>
    </>
}

export default Login;