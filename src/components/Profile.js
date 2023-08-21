import '../styles/Profile.css'
import arrow from '../assets/Icons/arrow-right.webp'
import { Navigate } from "react-router-dom"
import { useParams } from "react-router";
import { getProfile } from '../services/profiles.service'
import { useState, useEffect } from 'react'

export const Profile = () => {
    //const navigate = useNavigate();
    const [profile,setProfile] = useState(null);
    let { id } = useParams();

    useEffect(() => {
        getProfile(id)
        .then(data => {
            setProfile(data)
        })
        .catch((err) => console.log(err))
  }, [id])

    if(profile !== null){
        return (
            <div id='profile-root-container'>
                <img alt='Go back' onClick={() => window.history.back()} id='arrow-back' src={arrow}></img>
                <p>{profile.username}</p>
                {profile.relevance}
            </div>
        )
    }

    return (            
    <div id='profile-root-container'>
        <img alt='Go back' onClick={() => window.history.back()} id='arrow-back' src={arrow}></img>
        <p>...</p>
    </div>
    )
}