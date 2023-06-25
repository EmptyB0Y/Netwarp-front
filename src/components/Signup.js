import '../styles/signup.css'
import arrow from '../assets/Icons/arrow-right.webp'
import logo from '../assets/Logos/Net-Warp_logo.png'
import {Login} from './Login'
import {SignupUser} from '../services/credentials.service'
import {ReactSession} from 'react-session'
import ReactDOM from 'react-dom'

export const Signup = () => {

    return (
            <div id='root-container'>
                <div id='signup-container'>
                    <div id='signup-component'>
                        <h1 id='signup-form-title'>SIGN UP :</h1>
                        <div id='signup-form-container'>
                            <form id='signup-form' onSubmit={(e) => handleSubmit(e)}>
                                <p>E-mail address :</p>
                                <input name='email-input'/>
                                <p>Password :</p>
                                <input name='password-input' type='password' />
                                <p>Confirm password :</p>
                                <input name='confirm-password-input' type='password' />
                                <button id='submit-button' name='submit'><img alt='submit' id='arrow-submit' src={arrow}></img></button>
                            </form>
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
    const email = e.target['email-input'].value;
    const password = e.target['password-input'].value;
        SignupUser(email,password).then((data) => {
            if(data.token){
                ReactSession.set("userId",data.userId);
                ReactSession.set("token",data.token);
                sessionStorage.setItem("userId",data.userId)
                sessionStorage.setItem("token",data.token)
                window.location.reload();
            }
            else{
                alert("Error during the logging !")
            }
        });
}

function handleClick(){
    ReactDOM.render( 
        <div>
            <Login />
        </div>,
        document.getElementById('root')
        );
}