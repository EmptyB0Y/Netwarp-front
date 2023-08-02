import '../styles/Comment.css';
import arrow from '../assets/Icons/arrow-right.webp'
import cross from '../assets/Icons/cross.png'
import { getProfile } from '../services/profiles.service'
import { useState, useEffect } from 'react'
import { Comments } from './Comments'
import { createComment, deleteComment } from '../services/comments.service';
import { Link } from "react-router-dom";
import TextareaAutosize from 'react-textarea-autosize'

export const Comment = ({ProfileId, PostId, CommentId, content, id, level}) => {

    const [profile,setProfile] = useState(null);

    useEffect(() => {
            getProfile(ProfileId)
            .then(data => {
                setProfile(data)
            })
            .catch((err) => console.log(err))
      }, [ProfileId])
      
    
    let formElement = (<Link to='/login' className='form-element-comment'>Log in to comment</Link>)

    let deleteCommentElement = (<div></div>)

    if(sessionStorage.getItem('token')){

        formElement = (            
        <form className='form-element-comment' onSubmit={(e) => handleSubmit(e)}>
            <TextareaAutosize className='comment-input' role='textbox' placeholder="Leave a comment" name="content" rows="4"/>
            <button type='submit'><img alt='submit' className='comment-submit-icon' src={arrow}/></button>
        </form>  
        )

        if(level === 20){
            formElement = (<div></div>)
        }

        if(ProfileId == sessionStorage.getItem('profileId')){
            deleteCommentElement = (<img onClick={(e) => handleDeleteComment(e)} alt='delete comment' className='delete-comment-icon' src={cross}/>)
        }
    }

    if(profile !== null) {
        return (
        <div className='comment-root-container' >
            <div className='comment-top'>
                <div className='comment-author'>
                    <img alt='profile' className='author-picture' src={profile.pictureUrl}/>
                    <p className='author-username' >{profile.username}</p>        
                </div>
                {deleteCommentElement}
            </div>

            <div className='comment-content'>
                {content}
            </div>
            <Comments CommentId={id} level={level}/>
            <div className='reply' onClick={(e) => handleClick(e)}>
                {formElement}
                <button className='reply-button'>Reply</button>  
            </div>
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
            createComment(content,PostId,id).then((data) => {
                //window.location.reload()
                console.log(data)
            });
        }
    }

    function handleClick(e){
        if(e.target.style.display !== 'none' && e.target.className === 'reply-button'){
            e.target.parentNode.firstChild.style.display = 'flex'
            e.target.style.display = 'none'
        }
    }

    function handleDeleteComment(e){
        deleteComment(e.target.parentNode.parentNode.parentNode.id).then((data) =>{
            console.log(data)
        })
    }
}   