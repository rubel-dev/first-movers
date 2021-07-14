import React, { useContext } from 'react';
import './Header.css'
import { UserContext } from './../../App';
import logo from '../../images/logo.png'

const Header = (props) => {
    const [user, setUser] = useContext(UserContext) 
    return (
        <div class='header'>
            <nav class="navbar navbar-expand-lg navbar-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#"><img className='logo' src={logo} alt="" /></a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse  " id="navbarNavAltMarkup">
                            <div class="navbar-nav ms-auto">
                                <a class="nav-link active" href='/home'>Home</a>
                                <a class="nav-link">Destination</a>
                                <a class="nav-link" >Blog</a>
                                <a class="nav-link">Contact</a> 
                               {props.isUserAvailable ?<h6 className='header-name'>{user.name}</h6> : <a class="nav-link login-btn" href='/login'>Login</a>}
                            </div>
                        </div>
                    </div>
            </nav>
        </div>
    );
};

export default Header;