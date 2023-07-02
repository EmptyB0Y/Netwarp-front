import '../styles/Banner.css'
import logo from '../assets/Logos/Net-Warp_logo.png'
import menu from '../assets/Icons/menu.png'
import bell from '../assets/Icons/bell.png'
import { Link } from "react-router-dom";

export const Banner = () => {
    if(sessionStorage.getItem('token')){
        return (
            <div id='banner-root-container' >
                <div id='banner'>
                    <img id='logo' alt='logo' src={logo}></img>
                    <h1 id='banner-title'>WARP</h1>
                </div>
                <div id='navbar-connected'>
                    <button id='menu-button'><img id='menu-icon' alt='menu' src={menu}/></button>
                    <button id='notifications-button'><img id='bell-icon' alt='notifications' src={bell}/></button>
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