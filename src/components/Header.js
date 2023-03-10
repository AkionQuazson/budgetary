import { NavLink } from 'react-router-dom';
import '../styles/header.css'

const Header = (props) => {
    return <header>
        <NavLink className='in-header title' to='/' >Budgetary</NavLink>
        <NavLink className='in-header' to='/login' >Login</NavLink>
    </header>
}

export default Header;