import '../styles/Navbar.css'
import logo from '../assets/Logos/Net-Warp_logo2.png'
import menu from '../assets/Icons/menu.png'
import bell from '../assets/Icons/bell.png'
import picture from '../assets/Icons/default-profile-picture.png'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getProfile } from '../services/profiles.service'
import { useState, useEffect } from 'react'
import { getNotificationsByProfile } from '../services/profiles.service'
import { Notification } from './Notification'
import { deleteNotification } from '../services/profiles.service'

export const Navbar = () => {
    const navigate = useNavigate();

    const [profile,setProfile] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [load,setLoad] = useState(false);
    const [change,setChange] = useState(false);

    useEffect(() => {
        getProfile(sessionStorage.getItem('profileId'))
        .then(data => {
            setProfile(data)
            getNotificationsByProfile(data.id).then(data => {
                console.log(data);
                setNotifications(data.reverse())
                setLoad(true)
            });
        })
        .catch((err) => console.log(err))
    }, [change])

    const refresh = () => {
        setChange(!change);
    }

    if(sessionStorage.getItem('token')){
        let notificationItem = (
                <div id='notifications-list'>
                    {notifications.map(notification => 
                    <Notification id={notification.id} ProfileId={notification.ProfileId} content={notification.content} createdAt={notification.createdAt} target={notification.target} key={notification.id} deleteFunction={handleClickCross}/>)}
                </div>
            )
        if(notifications.length === 0){
            notificationItem = <p>All caught up !</p>
        }
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
            <div id='navbar-root-container' >
                <div id='navbar'>
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
                            {notificationItem}
                        </div>
                    </button>
                </div>
            </div>
            ) 
    }

    return (
    <div id='navbar-root-container' >
        <div id='navbar'>
            <img id='logo' alt='logo' src={logo}></img>
            <div id='navbar-items'>
                <Link to={'/signup/0'} className="nav-link"> SIGN UP </Link>
                <Link to={'/login'} className="nav-link"> LOG IN </Link>
                <Link to={'/home/general'} className="nav-link"> HOME </Link>
            </div>
        </div>

    </div>)


    function handleClick(){
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('profileId')
    sessionStorage.removeItem('access')
    navigate('/login');
    window.location.reload();         
    }

    function handleClickCross(e) {
        e.preventDefault()
        e.stopPropagation()
        let idNotification = e.target.parentNode.parentNode.id.substring(13)
        
        console.log(idNotification)
        deleteNotification(idNotification).then(() => {
            console.log('Notification deleted')
            e.target.parentNode.parentNode.style.display = 'none'
            refresh()
        })
    }
}