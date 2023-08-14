import '../styles/Banner.css'
import logo from '../assets/Logos/Net-Warp_logo2.png'
import menu from '../assets/Icons/menu.png'
import bell from '../assets/Icons/bell.png'
import picture from '../assets/Icons/default-profile-picture.png'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getProfile } from '../services/profiles.service'
import { useState, useEffect } from 'react'

export const Banner = () => {
    const navigate = useNavigate();

    const [profile,setProfile] = useState(null);

    useEffect(() => {
        getProfile(sessionStorage.getItem('profileId'))
        .then(data => {
            setProfile(data)
        })
        .catch((err) => console.log(err))
  }, [])

    if(sessionStorage.getItem('token')){
        let profileItem = (                            
            <span id='profile' className='menu-item'>
                <img alt='Profile' id='navbar-profile-picture' src={picture}></img>
                <Link id='navbar-profile-username' to={'/profile/' + sessionStorage.getItem('profileId')}> User </Link>
            </span>
            )

        if(profile != null){
            profileItem = (                            
                <span id='profile' className='menu-item'>
                    <img alt='Profile' id='navbar-profile-picture' src={profile.pictureUrl}></img>
                    <Link id='navbar-profile-username' to={'/profile/' + sessionStorage.getItem('profileId')}> {profile.username} </Link>
                </span>
                )
        }
        return (
            <div id='banner-root-container' >
                <div id='banner'>
                    <Link to='/home/general'>
                    <img id='logo' alt='logo' src={logo}></img>
                    </Link>
                </div>
                <div id='navbar-connected'>
                    <button id='menu-button'>
                        <img id='menu-icon' alt='menu' src={menu}/>
                        <div id='menu'>
                            {profileItem}
                            <p className='menu-item' id='signout' onClick={handleClick}>SIGN OUT</p>
                        </div>
                    </button>
                    <button id='notifications-button'>
                        <img id='bell-icon' alt='notifications' src={bell}/>
                        <div id='notifications'>
                        </div>
                    </button>
                </div>
            </div>
            ) 
    }

    return (
    <div id='banner-root-container' >
        <div id='banner'>
            <img id='logo' alt='logo' src={logo}></img>
            <div id='navbar'>
                <Link to={'/signup'} className="nav-link"> SIGN UP </Link>
                <Link to={'/login'} className="nav-link"> LOG IN </Link>
                <Link to={'/home'} className="nav-link"> HOME </Link>
            </div>
        </div>

    </div>)


    function handleClick(){
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('profileId')
    navigate('/login');
    window.location.reload();         
    }
    // function handleClickSignup(){
    //     ReactDOM.render(<></>, document.getElementById('root'));
    //     ReactDOM.render(
    //         <div>
    //             <Signup />
    //         </div>,
    //         document.getElementById('root')
    //         );
    // }
}