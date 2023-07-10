import '../styles/Home.css'
import { useNavigate } from "react-router-dom";
import { Post } from './Post'
//import { getPosts } from '../services/mockdata'
import { useState, useEffect } from 'react'
import { getPosts } from '../services/posts.service'
import { getProfile } from '../services/profiles.service'

export const Home = () => {
    const navigate = useNavigate();
    const [profile,setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [load,setLoad] = useState(false);
    const [change,setChange] = useState(false);
    const [topic,setTopic] = useState('general');

    useEffect(() => {
        if(sessionStorage.getItem('profileId')){
            getProfile(sessionStorage.getItem('profileId'))
            .then(data => {
                setProfile(data)
                console.log(data);
                //refresh()
            })
            .catch((err) => console.log(err))
        }
      }, [change])

    useEffect(() => {
        getPosts(topic)
        .then(data => {
            setPosts(data)
            setLoad(true)
        })
        .catch((err) => console.log(err)) 
      }, [topic])

    //let posts = getPosts();
    const refresh = () => {
        setChange(!change);
    }

    let postsElement = (<div>Loading...</div>);
    
    if(load){
        console.log("test")

        postsElement = (posts.map(post => 
        <div className='post' key={post.id}>
            <Post ProfileId={post.ProfileId} MissionId={post.MissionId} content={post.content} topic={post.topic}/> 
        </div>))

        if(posts === []){
            postsElement = (<div>No posts yet, be the first to publish !</div>)
        }
    }

    if(sessionStorage.getItem('token')) {
        return (
            <div id='home-root-container'>
                <button id='signout-button' onClick={handleClick}>SIGN OUT</button>
                <div id='posts'>
                    {postsElement}
                </div>
            </div>
        )
    }

    return (
        <div id='home-root-container'>
            <div id='posts'>
                {postsElement}
            </div>
        </div>
    )

    function handleClick(){
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('profileId')
        navigate('/login');
        window.location.reload();         
    }
}