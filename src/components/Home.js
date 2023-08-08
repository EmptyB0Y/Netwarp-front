import '../styles/Home.css'
import arrow from '../assets/Icons/arrow-right.webp'
//import { useNavigate } from "react-router-dom";
import { Post } from './Post'
import { Searchbar } from './Searchbar'
//import { getPosts } from '../services/mockdata'
import { useState, useEffect } from 'react'
import { getPosts, createPost, deletePost } from '../services/posts.service'
//import { getProfile } from '../services/profiles.service'
import TextareaAutosize from 'react-textarea-autosize'

export const Home = () => {

    //const [profile,setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [load,setLoad] = useState(false);
    const [change,setChange] = useState(false);
    const [topic,setTopic] = useState('general');

    // useEffect(() => {
    //     if(sessionStorage.getItem('profileId')){
    //         getProfile(sessionStorage.getItem('profileId'))
    //         .then(data => {
    //             setProfile(data)
    //             console.log(data);
    //             //refresh()
    //         })
    //         .catch((err) => console.log(err))
    //     }
    //   }, [change])

    useEffect(() => {
        getPosts(topic)
        .then(data => {
            setPosts(data.reverse())
            setLoad(true)
        })
        .catch((err) => console.log(err)) 
      }, [topic,change])

    //let posts = getPosts();
    const refresh = () => {
        setChange(!change);
    }

    let postsElement = (<div>Loading...</div>);
    
    if(load){

        postsElement = (posts.map(post => 
        <div className='post' id={post.id} key={post.id}>
            <Post ProfileId={post.ProfileId} MissionId={post.MissionId} content={post.content} topic={post.topic} id={post.id} deleteFunction={handleDeletePost}/> 
        </div>))

        if(posts === []){
            postsElement = (<div>No posts yet, be the first to publish !</div>)
        }
    }

    if(sessionStorage.getItem('token')) {
        return (
            <div id='home-root-container'>
                    <Searchbar />
                    <form id='add-post-form' onSubmit={(e) => handleSubmit(e)}>
                        <TextareaAutosize id='post-input' role='textbox' placeholder="Something to say ?" name="content" rows="4"/>
                        <button id='post-submit' type='submit'><img alt='submit' id='post-submit-icon' src={arrow}/></button>
                    </form>

                <div id='posts'>
                    {postsElement}
                </div>
            </div>
        )
    }

    return (
        <div id='home-root-container'>
            <Searchbar />
            <div id='posts'>
                {postsElement}
            </div>
        </div>
    )

    function handleSubmit(event){
        event.preventDefault()
        event.stopPropagation()

        if(event.target['content'].value !== ""){
            createPost(event.target['content'].value,topic).then( () => {
                refresh()
                document.getElementById('post-input').value = ""
            })
        }

    }

    function handleDeletePost(e){
        console.log(e.target.parentNode.parentNode.parentNode.id)
        deletePost(e.target.parentNode.parentNode.parentNode.id).then((data) =>{
            console.log(data)
            refresh()
        })
    }
}