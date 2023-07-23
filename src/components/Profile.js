import '../styles/Profile.css'
//import arrow from '../assets/Icons/arrow-right.webp'
import { Navigate } from "react-router-dom"


export const Profile = ({username}) => {
    //const navigate = useNavigate();

    if(sessionStorage.getItem('profileId') !== null){
        return (
            <div id='profile-root-container'>
                <p>username</p>
            </div>
        )
    }
    else{
        return (<Navigate to='/login' />)
    }
    
}