import '../styles/Home.css'
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();

    if(sessionStorage.getItem('token')) {
        return (
            <div id='home-root-container'>
                <p>Home component</p>
                <button id='signout-button' onClick={handleClick}>SIGN OUT</button>
            </div>
        )
    }

    return (
        <div id='home-root-container'>
            <p>Home component</p>
        </div>
    )

    function handleClick(){
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('userId')
        navigate('/login');
        window.location.reload();         
    }
}