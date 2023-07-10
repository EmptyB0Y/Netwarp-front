import '../styles/Login.css'
import arrow from '../assets/Icons/arrow-right.webp'
import logo from '../assets/Logos/Net-Warp_logo.png'
import {loginUser} from '../services/credentials.service'
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate();

    return (
            <div>
                <div id='login-root-container'>
                    <div id='login-container'>
                        <div id='login-component'>
                            <h1 id='login-form-title'>LOG IN :</h1>
                            <div id='login-form-container'>
                                <form id='login-form' onSubmit={(e) => handleSubmit(e)}>
                                    <p>E-mail address :</p>
                                    <input name='email-input'/>
                                    <p>Password :</p>
                                    <input name='password-input' type='password' />
                                    <button id='submit-button' name='submit'><img alt='submit' id='arrow-submit' src={arrow}></img></button>
                                </form>
                                <p className='login-form-error' id='login-error'>Login failed</p>
                                <Link to={'/signup'} id="signup-link"> Sign up here </Link>
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
            </div>
        )

    function handleSubmit(e) {
        e.preventDefault()
        e.stopPropagation()
    
        const email = e.target['email-input'].value;
        const password = e.target['password-input'].value;
            loginUser(email,password).then((data) => {
                if(data.token){
                    sessionStorage.setItem("profileId",data.profileId);
                    sessionStorage.setItem("token",data.token);
                    navigate('/home');   
                    window.location.reload();         
                }
                else{
                    document.getElementById("login-error").style.display = "block";
                }
            });
    }
}