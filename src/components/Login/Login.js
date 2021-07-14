import React, { useState } from 'react';
import Header from '../Header/Header';
import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './../../firebase.config';
import { useContext } from 'react';
import { UserContext } from './../../App';
import { useHistory, useLocation } from 'react-router-dom';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
const Login = () => {
    const [user, setUser] = useContext(UserContext)
    const [newUser, setNewUser] = useState(true)
    const provider = new firebase.auth.GoogleAuthProvider();
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    
    const handleBlur = (e) => {
        let isFormValid = true;
        
        if (e.target.name === "email") {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
        }

        if (e.target.name === "password") {
            isFormValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(e.target.value) 

        } 
      
        if (isFormValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value; 
            setUser(newUserInfo)
        }
    } 
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => { 
                    const newUserInfo = {...user}
                    newUserInfo.success = true
                    setUser(newUserInfo)  
                    updateProfile(user.name)
                     
                })
                .catch((error) => {
                    const newUserInfo = { ...user}
                    newUserInfo.error = error.message
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                   
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user}
                    newUserInfo.success = true;
                    setUser(newUserInfo)
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user}
                    newUserInfo.error = error.message
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }

        e.preventDefault()
    }

    const updateProfile = (name) => {

        const user = firebase.auth().currentUser; 
        user.updateProfile({
            displayName:name, 
        }).then(() => {
              
        }).catch((error) => {
             
        });
    }


    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const newUser = {
                    name: displayName,
                    email: email
                }
                setUser(newUser)
                history.replace(from);
            })
            .catch((error) => {
                const errorMessage = error.message;
                const credential = error.credential;
                console.log(errorMessage, credential)

            });
    }

    const handleFocus = () => {
        alert('Password must contain at least 8 characters, including one UPPER, lowercase and one numbers')

    }
    return (
        <div className='container'>
            <Header></Header>
            <div className="login">
                <div className="email-sign-in">
                    <form onSubmit={handleSubmit}>
                        <h5>{newUser ? "Create an account" : "Login"}</h5>
                        {newUser && <input className='form-control' onBlur={handleBlur} type="text" name='name' placeholder='Name' required />}
                        <br />
                        <input className='form-control' onBlur={handleBlur} type="email" title="please fill out this filed" name="email" placeholder='Username or Email' id="" required />
                        <br />
                        <input className='form-control' onBlur={handleBlur} type="password" title="please fill out this filed" onClick={handleFocus} name="password" placeholder='Password' required id="" />
                        <br />
                        {newUser && <input className='form-control' onBlur={handleBlur} type="password" title="please fill out this filed" name="confirmPassword" disabled placeholder='Confirm Password' id="" />}
                        <br />
                        {
                            newUser ?
                                <input type="submit" value="Create an account" className='form-control login-btn' />
                                :
                                <input type="submit" value="Login" className='form-control login-btn' />
                        }

                        <p className='text-center mt-2'><small>Already have an account? <span style={{ color: "#FF6E40", cursor: 'pointer' }} onClick={() => setNewUser(!newUser)}>{newUser ? "Login" : "Create an account"}</span></small></p>
                        <p style={{color:'red'}}>{user.error}</p>
                         {
                             user.success && <p style={{color:'green',textAlign:'center',fontSize:'12px'}}>User <span>{newUser ? "Created":"Logged In"}</span> Successfully !!!</p>
                         }
                    </form>
                </div>
                <h5 className='mt-3 ms-5'>----------Or-----------</h5>
                <div className="google-sign">
                    <button onClick={handleGoogleSignIn} className='btn btn-primary main-btn'><i className="fab fa-google"></i> Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;