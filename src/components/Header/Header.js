import React, { useContext } from 'react';
import './Header.css'
import { UserContext } from './../../App';
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom';

const Header = (props) => {
    const [user] = useContext(UserContext) 
    return (
        <div class='header'>
            <nav class="navbar navbar-expand-lg navbar-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="/brand"><img className='logo' src={logo} alt="" /></a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse  " id="navbarNavAltMarkup">
                            <div class="navbar-nav ms-auto">
                                <Link to='/home' class="nav-link active" >Home</Link>
                                <Link class="nav-link">Destination</Link>
                                <Link class="nav-link">Blog</Link>
                                <Link class="nav-link">Contact</Link> 
                               {props.isUserAvailable ?<h6 className='header-name'>{user.name}</h6> : <a class="nav-link login-btn" href='/login'>Login</a>}
                            </div>
                        </div>
                    </div>
            </nav>
        </div>
    );
};

export default Header;