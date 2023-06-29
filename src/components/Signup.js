import '../styles/signup.css'
import arrow from '../assets/Icons/arrow-right.webp'
import logo from '../assets/Logos/Net-Warp_logo.png'
import {Login} from './Login'
import {signupUser} from '../services/credentials.service'
import ReactDOM from 'react-dom'

export const Signup = () => {

    return (
            <div id='signup-root-container'>
                <div id='signup-container'>
                    <div id='signup-component'>
                        <h1 id='signup-form-title'>SIGN UP :</h1>
                        <div id='signup-form-container'>
                            <form id='signup-form' onSubmit={(e) => handleSubmit(e)}>
                                <p>E-mail address :</p>
                                <input name='email-input'/>
                                <p className='form-error' id='email-error'>Invalid format !</p>
                                <p>Password :</p>
                                <input name='password-input' type='password' />
                                <p className='form-error' id='password-error'>Password must be 8 characters long and contain at least: 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character</p>
                                <p>Confirm password :</p>
                                <input name='confirm-password-input' type='password' />
                                <p className='form-error' id='password-confirm-error'>Passwords do not match !</p>
                                <p>Username :</p>
                                <input name='username-input'></input>
                                <p className='form-error' id='username-error'>You must enter a username !</p>
                                <button id='submit-button' name='submit'><img alt='submit' id='arrow-submit' src={arrow}></img></button>
                            </form>
                            <p class='form-error' id='signup-error'>This e-mail address is already in use !</p>
                            <span id='signup-link' onClick={handleClick}>Log in here</span>
                        </div>
                    </div>
                </div>
                <div id='welcome-container'>
                    <div id='welcome-component'>
                        <p id='welcome-paragraph'>Welcome to Net-Warp</p>
                        <img id='big-logo' alt='logo' src={logo}></img>
                    </div>
                </div>
            </div>
        )
}

function handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()
    const email = e.target['email-input'].value;
    const password = e.target['password-input'].value;
    const confirmPassword = e.target['confirm-password-input'].value;
    const username = e.target['username-input'].value;

    const emailValid = /^[A-Za-z0-9_-]+@\w+\.[a-z]+$/;
    const passwordStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

    //(?=.*[a-z]) : The string must contain at least 1 lowercase alphabetical character
    //(?=.*[A-Z]) : The string must contain at least 1 uppercase alphabetical character
    //(?=.*[0-9]) : The string must contain at least 1 numeric character
    //(?=.*[!@#$%^&*]) : The string must contain at least one special character, but we are escaping reserved regex characters to avoid conflict
    //(?=.{8,})	The string must be eight characters or longer

    let pass = true;
    if(!emailValid.test(email)){
        document.getElementById("email-error").style.display = "block";
        pass = false;
    }
    else{
        document.getElementById("email-error").style.display = "none";
    }
    if(!passwordStrong.test(password)){
        document.getElementById("password-error").style.display = "block";
        pass = false;
    }
    else{
        document.getElementById("password-error").style.display = "none";
    }
    if(password !== confirmPassword){
        document.getElementById("password-confirm-error").style.display = "block";
        pass = false;
    }
    else{
        document.getElementById("password-confirm-error").style.display = "none";
    }
    if(username === ""){
        document.getElementById("username-error").style.display = "block";
        pass = false;
    }
    else{
        document.getElementById("username-error").style.display = "none";
    }

    if(pass) {
        signupUser(email,password).then((data) => {
            console.log(data.name);
            if(data.name === 'Error'){
                document.getElementById("signup-error").style.display = "block";
            }
            else{
                window.location.reload();
            }
        });
    }
}

function handleClick(){
    ReactDOM.render(<></>, document.getElementById('root'));
    ReactDOM.render( 
        <div>
            <Login />
        </div>,
        document.getElementById('root')
        );
}