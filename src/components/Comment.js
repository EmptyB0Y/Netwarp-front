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
import { uploadPhoto } from '../services/comments.service';
import { getPhotos } from '../services/comments.service';
import { deleteComment } from '../services/comments.service';

export const Comment = ({ProfileId, PostId, content, id, level, deleteFunction, createdAt, upvotes}) => {
    const [profile,setProfile] = useState(null);
    const [change,setChange] = useState(false);
    const [upvotesArray,setUpvotesArray] = useState(JSON.parse(upvotes));
    const [image,setImage] = useState(null);
    const [images,setImages] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
            getProfile(ProfileId)
            .then(data => {
                setProfile(data)
            })
            .catch((err) => console.log(err))
      }, [change, ProfileId])
      
      useEffect(() => {
        getPhotos(id)
        .then(data => {
            setImages(data)
            setLoad(true)
            })
        .catch((err) => console.log(err))
    }, [change])

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
            <div className='media'>
                <img alt='Gifs' className='gifs-anchor' src={plus} onClick={(e) => handleClickGifSearch(e)}></img>
                <input type='file' id='upload' onInput={(e) => handleInputImage(e)} width='20' height='20' multiple/>
            </div>
        </form>  
        )

        if(level === 20){
            formElement = (<div></div>)
        }

        if(ProfileId == sessionStorage.getItem('profileId') || sessionStorage.getItem('access') == 'admin'){
            deleteCommentElement = (<img onClick={(e) => deleteFunction(e)} alt='delete comment' className='delete-comment-icon' src={cross}/>)
        }
    }

    if(profile !== null) {
        return (
        <div className='comment-root-container'>
            <div className='comment-top'>
                <div className='comment-author'>
                    <img alt='profile' className='author-picture' src={profile.pictureUrl}/>
                    <Link className='profile-username-link' to={'/profile/' + profile.id}> {profile.username} </Link>
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
                <img alt='Upvote' className='upvote-icon' src={upvoted[upvotesArray.includes(parseInt(sessionStorage.getItem('profileId')))]} onClick={(e) => handleUpvote(e)}></img>
            </div>
            <Comments CommentId={id} level={level} change={change} deleteFunction={handleDeleteComment}/>
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

        if((content === null || content === "") && image === null) {
            alert("You can't send a blank comment")
            return
        }

        e.target['content'].value = '';

        if(id){
            createComment(content,PostId,id).then((comment) => {             
                if(image != null){
                    console.log("image submitted");
                    uploadPhoto(comment.id,image).then(() => {
                        console.log("Image uploaded successfully");
                    });
                }
                refresh()
            });
        }
    }

    function handleDeleteComment(e){
        console.log(e.target.parentNode.parentNode.parentNode.id)
        deleteComment(e.target.parentNode.parentNode.parentNode.id).then((data) =>{
            console.log(data)
            refresh()
        })
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
        if(load){
            for (var i = 0; i < images.length; i++){
                text += ' :'+ images[i].url +':'
            }
            console.log('content :')
            console.log(text)
        }
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
    
    function handleInputImage(e){
        const file = Array.from(e.target.files);

        if(file.length > 0){
            if(file[0].name.endsWith(".jpg") || file[0].name.endsWith(".jpeg") || file[0].name.endsWith(".PNG")){
            console.log("ok");
            setImage(file[0]);
            }
            else{
                alert("Invalid file format !");
                e.target.files = []
            }
        }
      }
}   