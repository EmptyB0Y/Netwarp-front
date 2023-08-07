import '../styles/FocusPost.css';
import { getPost } from '../services/posts.service';
import { Post } from './Post'
import { useState, useEffect } from 'react'
import { useParams } from "react-router";
import arrow from '../assets/Icons/arrow-right.webp'

export const FocusPost = () => {
    const [post,setPost] = useState(null);
    let { id } = useParams();

    useEffect(() => {
        getPost(id)
        .then(data => {
            console.log(data);
            setPost(data)
        })
        .catch((err) => console.log(err))
  }, [id])
  
    if(post !== null){
        return (
            <div id='focus-post-root-container'>    
                <img alt='Go back' onClick={() => window.history.back()} id='arrow-back' src={arrow}></img>
                <Post ProfileId={post.ProfileId} MissionId={post.MissionId} content={post.content} topic={post.topic} id={post.id} />
            </div>
        )
    }

    return (
        <div id='home-root-container'>
            <p>...</p>
        </div>
        )
}
