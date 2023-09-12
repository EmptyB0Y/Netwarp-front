import '../styles/Settings.css';
import { Navigate, useNavigate } from "react-router-dom";
import { deleteUser, getProfile, getUser } from "../services/profiles.service";
import { useEffect, useState } from "react";

export const Settings = () =>{
    const [user,setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if(sessionStorage.getItem("token")){
            getProfile(sessionStorage.getItem("profileId"))
            .then(data => {
                getUser(data.UserId).then(user =>{
                    setUser(user)
                })
            })
            .catch((err) => console.log(err))
        }
    }, [])

    if(sessionStorage.getItem("token")){
        if(user == null){
            return(        
            <div id='settings-root-container'>
                <h1>SETTINGS</h1>
                <p>Loading...</p>
            </div>
            )
        }
        return (
        <div id='settings-root-container'>
            <h1>SETTINGS</h1>
            <div id='delete-account-setting' className='setting'>
                <p>Delete account :</p>
                <form id='delete-account-form' onSubmit={(e) => handleSubmit(e)}>
                    <p>Password</p>
                    <input type='password' name='password-input' />
                    <p>Confirm password</p>
                    <input type='password' name='password-confirm-input' />
                    <p className='form-error' id='password-confirm-error'>Passwords do not match !</p>
                    <button id='delete-account-submit-button'>DELETE ACCOUNT</button>
                </form>
            </div>
        </div>
        )
    }
    return (<Navigate to='/login' />);

    function handleSubmit(e){
        e.stopPropagation();
        e.preventDefault();

        const password = e.target['password-input'].value;
        const confirmPassword = e.target['password-confirm-input'].value;

        let pass = true;

        if(password == "" || confirmPassword == "") {
            pass = false;
        }

        if(password !== confirmPassword){
            document.getElementById("password-confirm-error").style.display = "block";
            pass = false;
        }
        else{
            document.getElementById("password-confirm-error").style.display = "none";
        }

        if(pass){
            deleteUser(user.id,password).then((data) => {
                console.log(data)
                if(data.code === "ERR_BAD_REQUEST"){
                    alert("Could not delete account")
                }else{
                    sessionStorage.clear()
                    navigate('/login');   
                }
            });
        }
    }
}