import '../styles/Comment.css';
import arrow from '../assets/Icons/arrow-right.webp'
import plus from '../assets/Icons/plus.png'
import cross from '../assets/Icons/cross.png'
import checkmark from '../assets/Icons/check-mark.png'
import checkmarkActive from '../assets/Icons/check-mark-active.png'
import { getProfile } from '../services/profiles.service'
import { useState, useEffect } from 'react'
import { Comments } from './Comments'
import { createComment, upvoteComment, getCommentById } from '../services/comments.service';
import { Link } from "react-router-dom";
import TextareaAutosize from 'react-textarea-autosize'
import { GifSearch } from './GifSearch';

export const Comment = ({ProfileId, PostId, content, id, level, deleteFunction, createdAt, upvotes}) => {
    const [profile,setProfile] = useState(null);
    const [change,setChange] = useState(false);
    const [upvotesArray,setUpvotesArray] = useState(JSON.parse(upvotes));

    useEffect(() => {
            getProfile(ProfileId)
            .then(data => {
                setProfile(data)
            })
            .catch((err) => console.log(err))
      }, [change, ProfileId])
      
    const refresh = () => {
        setChange(!change);
    }
    
    let upvoted = {}

    upvoted[false] = checkmark;
    upvoted[true] = checkmarkActive;

    let formElement = (<Link to='/login' className='form-element-comment'>Log in to comment</Link>)

    let deleteCommentElement = (<div></div>)

    if(sessionStorage.getItem('token')){

        formElement = (            
        <form className='form-element-comment' onSubmit={(e) => handleSubmit(e)}>
            <TextareaAutosize id={'comment-input-'+id} className='comment-input' role='textbox' placeholder="Leave a comment" name="content" rows="4"/>
            <button className='comment-submit-button' type='submit'><img alt='submit' className='comment-submit-icon' src={arrow}/></button>
            <div className='gif-search' id={'gif-search-'+id} style={{display: 'none'}}>
                <GifSearch place={'comment-input-'+id}/>
            </div>
            <img alt='Gifs' className='gifs-anchor' src={plus} onClick={(e) => handleClickGifSearch(e)}></img>
        </form>  
        )

        if(level === 20){
            formElement = (<div></div>)
        }

        if(ProfileId == sessionStorage.getItem('profileId')){
            deleteCommentElement = (<img onClick={(e) => deleteFunction(e)} alt='delete comment' className='delete-comment-icon' src={cross}/>)
        }
    }

    if(profile !== null) {
        return (
        <div className='comment-root-container'>
            <div className='comment-top'>
                <div className='comment-author'>
                    <img alt='profile' className='author-picture' src={profile.pictureUrl}/>
                    <p className='author-username' >{profile.username}</p>   
                    <p className='createdAt'>{createdAt.substring(0,10) + " " + createdAt.substring(11,16)}</p>     
                </div>
                {deleteCommentElement}
            </div>
            <div className='comment-content'>
                {formatContent(content)}
            </div>
            <div className='reply' onClick={(e) => handleClick(e)}>
                {formElement}
                <button className='reply-button'>Reply</button>  
                <img alt='' className='upvote-icon' src={upvoted[upvotesArray.includes(parseInt(sessionStorage.getItem('profileId')))]} onClick={(e) => handleUpvote(e)}></img>
            </div>
            <Comments CommentId={id} level={level} change={change}/>
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
        document.getElementById('gif-search-'+id).style.display = 'none'

        e.target['content'].value = '';

        if(id){
            createComment(content,PostId,id).then((data) => {
                console.log(data)
                refresh()
            });
        }
    }

    function handleUpvote(e){
        e.stopPropagation()
        upvoteComment(e.target.parentNode.parentNode.parentNode.id).then((data) => {
            getCommentById(e.target.parentNode.parentNode.parentNode.id).then((comment) =>{
                console.log(comment);
                setUpvotesArray(JSON.parse(comment.upvotes));
            });
        });
    }

    function handleClick(e){
        if(e.target.style.display !== 'none' && e.target.className === 'reply-button'){
            e.target.parentNode.firstChild.style.display = 'flex'
            e.target.style.display = 'none'
        }
    }

    function formatContent(text){
        const tab = text.split(' ');
        let content = [];

        let string = '';
        for(let i = 0; i < tab.length; i++){
            if(tab[i].startsWith(':') && tab[i].endsWith(':')){
                content.push((<p>{string}</p>));
                string = '';
                content.push((<img src={tab[i].substring(1,tab[i].length-1)}></img>));
            }
            else if(tab[i].split('.').length > 1){
                content.push((<a href={tab[i]}>{tab[i]}</a>));
            }
            else{
                string += ' '+tab[i];
            }
        }

        if(string !== ''){
            content.push((<p>{string}</p>));
        }

        return (<div>
            {content.map((el)=>el)}
        </div>);
    }

    function handleClickGifSearch(e){

        if(document.getElementById('gif-search-'+id).style.display == 'none'){
            document.getElementById('gif-search-'+id).style.display = 'block'
        }
        else{
            document.getElementById('gif-search-'+id).style.display = 'none'
        }

    }
}   