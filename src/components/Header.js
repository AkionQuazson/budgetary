import { NavLink } from 'react-router-dom';
import '../styles/header.css'
import { useContext } from 'react';
import AuthContext from '../store/loginContext';

const Header = (props) => {
    const {token, logout} = useContext(AuthContext);
    return <header>
        <NavLink className='in-header title' to='/' >Budgetary</NavLink>
        {(!token) ? <NavLink className='in-header' to='/login' >Login</NavLink> : <a onClick={() => {logout()}}>Logout</a>}
    </header>
}

export default Header;