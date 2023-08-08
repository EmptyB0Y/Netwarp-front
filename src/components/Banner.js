import '../styles/Banner.css'
import logo from '../assets/Logos/Net-Warp_logo2.png'
import menu from '../assets/Icons/menu.png'
import bell from '../assets/Icons/bell.png'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Banner = () => {
    const navigate = useNavigate();

    if(sessionStorage.getItem('token')){

        return (
            <div id='banner-root-container' >
                <div id='banner'>
                    <Link to='/home'>
                    <img id='logo' alt='logo' src={logo}></img>
                    </Link>
                </div>
                <div id='navbar-connected'>
                    <button id='menu-button'>
                        <img id='menu-icon' alt='menu' src={menu}/>
                        <div id='menu'>
                            <button id='signout-button' onClick={handleClick}>SIGN OUT</button>
                            <Link to={'/profile/' + sessionStorage.getItem('profileId')}> PROFILE </Link>
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