import '../styles/Post.css';
import arrow from '../assets/Icons/arrow-right.webp'
import { useState, useEffect } from 'react'
import { getProfile } from '../services/profiles.service'
import { Comments } from './Comments'
import { createComment } from '../services/comments.service';
import { Link } from "react-router-dom";
import TextareaAutosize from 'react-textarea-autosize'
import {useNavigate} from "react-router-dom";
import { deleteComment } from '../services/comments.service';

export const Post = ({ProfileId, MissionId, content, topic, id }) => {
    const [profile,setProfile] = useState(null);
    const [change,setChange] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
            getProfile(ProfileId)
            .then(data => {
                setProfile(data)
            })
            .catch((err) => console.log(err))
      }, [ProfileId, change])
    
    const refresh = () => {
        setChange(!change);
    }

    let formElement = (<Link to='/login' className='form-element'>Log in to comment</Link>)

    if(sessionStorage.getItem('token')){
            formElement = (            
        <form className='form-element' onSubmit={(e) => handleSubmit(e)}>
            <TextareaAutosize className='comment-input' role='textbox' placeholder="Leave a comment" name="content" rows="4"/>
            <button type='submit'><img alt='submit' className='comment-submit-icon' src={arrow}/></button>
        </form>  
        )
    }

    if(profile !== null) {
        return (        
            <div className='post-root-container'>
                <div className='post-author'>
                    <img alt='profile' className='author-picture' src={profile.pictureUrl}/>
                    <p className='author-username' >{profile.username}</p>
                </div>
                <div className='post-topic'>
                    <p>#{topic}</p>
                </div>
                <div className='post-content' onClick={handleClick}>
                    {content}
                </div>
                <div className='comments-frame'>
                    <Comments PostId={id} change={change} deleteFunction={handleDeleteComment}/>
                </div>
                {formElement}
            </div>
        )
    }
    
    return (
        <div className='post-root-container'>
            <p>...</p>
        </div>
    )
    function handleSubmit(e) {
        e.preventDefault()
        e.stopPropagation()

        const content = e.target['content'].value;

        if(id){
            createComment(content,id).then(() => {
                refresh()
            });
        }
    }

    function handleClick() {
        navigate('/focus-post/' + id)
    }
    
    function handleDeleteComment(e){
        console.log(e.target.parentNode.parentNode.parentNode.id)
        deleteComment(e.target.parentNode.parentNode.parentNode.id).then((data) =>{
            console.log(data)
            refresh()
        })
    }

}