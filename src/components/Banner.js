import '../styles/Banner.css'
import logo from '../assets/Logos/Net-Warp_logo.png'
import { Link } from "react-router-dom";

export const Banner = () => {
    if(sessionStorage.getItem('token')){
        return (
            <div>
        
            </div>) 
    }

    return (
    <div id='banner-root-container' >
        <img id='logo' alt='logo' src={logo}></img>
        <div id='navbar'>
            <Link to={'/signup'} className="nav-link"> SIGN UP </Link>
            <Link to={'/login'} className="nav-link"> LOG IN </Link>
            <Link to={'/home'} className="nav-link"> HOME </Link>
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