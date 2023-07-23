import '../styles/Comment.css';
import arrow from '../assets/Icons/arrow-right.webp'
import { getProfile } from '../services/profiles.service'
import { useState, useEffect } from 'react'
import { Comments } from './Comments'
import { createComment } from '../services/comments.service';
import { Link } from "react-router-dom";
import TextareaAutosize from 'react-textarea-autosize'

export const Comment = ({ProfileId, PostId, CommentId, content, id, level}) => {

    const [profile,setProfile] = useState(null);
    const [reply,setReply] = useState(false);

    useEffect(() => {
            getProfile(ProfileId)
            .then(data => {
                setProfile(data)
            })
            .catch((err) => console.log(err))
      }, [ProfileId])
      
    
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
        <div className='comment-root-container' >
            <div className='comment-author'>
                <img alt='profile' className='author-picture' src={profile.pictureUrl}/>
                <p className='author-username' >{profile.username}</p>        
            </div>
            <div className='comment-content'>
                {content}
            </div>
            <Comments CommentId={id} level={level}/>
            {formElement}
        </div>
        )
    }

    return (
        <div className='comment-root-container'>
            <p>...</p>
        </div>
    )
    function handleSubmit(e) {
        e.preventDefault()
        e.stopPropagation()
        
        const content = e.target['content'].value;

        if(id){
            createComment(content,PostId,id).then(() => {
                //window.location.reload()
            });
        }
    }
}   