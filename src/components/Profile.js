import '../styles/Profile.css'
import arrow from '../assets/Icons/arrow-right.webp'
import { Navigate } from "react-router-dom"
import { useParams } from "react-router";
import { editProfile, getProfile } from '../services/profiles.service'
import { getPostsByProfile, deletePost } from '../services/posts.service';
import { useState, useEffect } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { Post } from './Post'

export const Profile = () => {
    //const navigate = useNavigate();
    const [profile,setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [change,setChange] = useState(false);
    const [username, setUsername] = useState("_username_");
    const [description, setDescription] = useState("No description");

    let { id } = useParams();

    useEffect(() => {
        getProfile(id)
        .then(data => {
            console.log(data);
            setProfile(data)
            setUsername(data.username)
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
        let usernameElement = (<p id='username'>{profile.username}</p>)

        let descElement = (
            <div id='description-frame'>
            <div id='description-title'>
                <p>Description</p>
            </div>
            <p id="description">{description}</p>
            </div>
            );

        if(sessionStorage.getItem('profileId') == profile.id || sessionStorage.getItem('access') == "admin"){
            usernameElement = (
                <TextareaAutosize id='username' role='textbox' placeholder={username} name="content" rows="4" onChange={(e) => handleChangeUsername(e)}/>
            )

            descElement = (
            <div id='description-frame'>
                <div id='description-title'>
                    <p>Description</p>
                    <button onClick={handleClickSave}>SAVE</button>
                </div>
                <TextareaAutosize id='description' role='textbox' placeholder={description} name="content" rows="4" onChange={(e) => handleChangeDesc(e)}/>
            </div>
            )
        }
        
        return (
            <div id='profile-root-container'>
                <img alt='Go back' onClick={() => window.history.back()} id='arrow-back' src={arrow}></img>
                <div id='profile-frame'>
                    <div id='profile-picture-frame'>
                        <img id='profile-picture' src={profile.pictureUrl}/>
                    </div>
                    <div id='profile-infos-frame'>
                        {usernameElement}
                        <p id='relevance'>{profile.relevance} %</p>
                    </div>
                    {descElement}
                </div>
                <div id='posts-frame'>
                    {posts.map( post =>
                    <div id={'post-'+ post.id}>
                        <Post ProfileId={post.ProfileId} MissionId={post.MissionId} content={post.content} topic={post.topic} id={post.id} deleteFunction={handleDeletePost} createdAt={post.createdAt}/> 
                    </div>
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

    function handleChangeUsername(e){
        e.preventDefault();
        e.stopPropagation();

        setUsername(e.target.value);
    }

    function handleChangeDesc(e){
        e.preventDefault();
        e.stopPropagation();

        setDescription(e.target.value)
    }

    function handleClickSave(){
        editProfile(profile.id,username,description).then(data => {
            console.log(data)
            setProfile(data);
        })
    }

    function handleDeletePost(e){
        console.log((e.target.parentNode.parentNode.parentNode.id.substring(5)))
        deletePost(e.target.parentNode.parentNode.parentNode.id.substring(5)).then((data) =>{
            console.log(data)
            refresh()
        })
    }
}   