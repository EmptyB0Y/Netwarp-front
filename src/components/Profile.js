import '../styles/Profile.css'
import arrow from '../assets/Icons/arrow-right.webp'
import { Navigate } from "react-router-dom"
import { useParams } from "react-router";
import { getProfile } from '../services/profiles.service'
import { getPostsByProfile, deletePost } from '../services/posts.service';
import { useState, useEffect } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { Post } from './Post'

export const Profile = () => {
    //const navigate = useNavigate();
    const [profile,setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [change,setChange] = useState(false);
    const [description, setDescription] = useState("No description");

    let { id } = useParams();

    useEffect(() => {
        getProfile(id)
        .then(data => {
            console.log(data);
            setProfile(data)
            if(data.description != null){
                setDescription(data.description)
            }
        })
        .catch((err) => console.log(err))

        getPostsByProfile(id)
        .then(data => {
            setPosts(data)
        })
        .catch((err) => console.log(err))
  }, [change])

  const refresh = () => {
    setChange(!change);
}

  if(profile !== null){
        return (
            <div id='profile-root-container'>
                <img alt='Go back' onClick={() => window.history.back()} id='arrow-back' src={arrow}></img>
                <div id='profile-frame'>
                    <div id='profile-picture-frame'>
                        <img id='profile-picture' src={profile.pictureUrl}/>
                    </div>
                    <div id='profile-infos-frame'>
                        <p id='username'>{profile.username}</p>
                        <p id='relevance'>{profile.relevance} %</p>
                    </div>
                    <div id='description-frame'>
                        <p>Description</p>
                        <TextareaAutosize id='description' role='textbox' placeholder={description} name="content" rows="4"/>
                    </div>
                </div>
                <div id='posts-frame'>
                    {posts.map( post =>
                        <Post ProfileId={post.ProfileId} MissionId={post.MissionId} content={post.content} topic={post.topic} id={post.id} deleteFunction={handleDeletePost} createdAt={post.createdAt}/> 
                    )}
                </div>
            </div>
        )
    }

    return (            
    <div id='profile-root-container'>
        <img alt='Go back' onClick={() => window.history.back()} id='arrow-back' src={arrow}></img>
        <p>...</p>
    </div>
    )

    function handleDeletePost(e){
        console.log((e.target.parentNode.parentNode.parentNode.id.substring(5)))
        deletePost(e.target.parentNode.parentNode.parentNode.id.substring(5)).then((data) =>{
            console.log(data)
            refresh()
        })
    }
}