import '../styles/Post.css';
import arrow from '../assets/Icons/arrow-right.webp'
import cross from '../assets/Icons/cross.png'
import plus from '../assets/Icons/plus.png'
import { useState, useEffect } from 'react'
import { getProfile } from '../services/profiles.service'
import { Comments } from './Comments'
import { createComment } from '../services/comments.service';
import { Link } from "react-router-dom";
import TextareaAutosize from 'react-textarea-autosize'
import {useNavigate} from "react-router-dom";
import { deleteComment } from '../services/comments.service';
import { GifSearch } from './GifSearch';
import { uploadPhoto } from '../services/comments.service';
import { getPhotos } from '../services/posts.service';

export const Post = ({ProfileId, content, topic, id, deleteFunction, createdAt}) => {
    const [profile,setProfile] = useState(null);
    const [change,setChange] = useState(false);
    const [image,setImage] = useState(null);
    const [images,setImages] = useState([]);
    const [load, setLoad] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        getProfile(ProfileId)
        .then(data => {
            setProfile(data)
        })
        .catch((err) => console.log(err))
    }, [ProfileId, change])
    
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

    let formElement = (<Link to='/login' className='form-element'>Log in to comment</Link>)

    let deletePostElement = (<div></div>)

    if(sessionStorage.getItem('token')){
            formElement = (            
                <form className='form-element' onSubmit={(e) => handleSubmit(e)}>
                    <TextareaAutosize id={'comment-post-input-'+id} className='comment-post-input' role='textbox' placeholder="Leave a comment" name="content" rows="4"/>
                    <button className='comment-submit-button' type='submit'><img alt='submit' className='comment-submit-icon' src={arrow}/></button>
                        <div className='gif-search' id={'post-gif-search-'+id} style={{display: 'none'}}>
                            <GifSearch place={'comment-post-input-'+id}/>
                        </div>
                    <div className='media' >
                        <img alt='Gifs' className='gifs-anchor' src={plus} onClick={(e) => handleClickGifSearch(e)}></img>
                        <input type='file' id='upload' onInput={(e) => handleInputImage(e)} width='20' height='20' multiple/>
                    </div>

                </form>
            )

        if(ProfileId == sessionStorage.getItem('profileId') || sessionStorage.getItem('access') == 'admin'){
            deletePostElement = (<img onClick={(e) => deleteFunction(e)} alt='delete post' className='delete-post-icon' src={cross}/>)
        }
    }

    if(profile !== null) {
        return (        
            <div className='post-root-container'>
                <div className='post-top'>
                    <div className='post-author'>
                        <img alt='profile' className='author-picture' src={profile.pictureUrl}/>
                        <Link className='profile-username-link' to={'/profile/' + profile.id}> {profile.username} </Link>
                        <p className='createdAt'>{createdAt.substring(0,10) + " " + createdAt.substring(11,16)}</p>
                    </div>
                    {deletePostElement}
                </div>

                <div className='post-topic'>
                    <p>#{topic}</p>
                </div>
                <div className='post-content' onClick={handleClick}>
                    {formatContent(content)}
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
        document.getElementById('post-gif-search-'+id).style.display = 'none'
        
        if((content === null || content === "") && image === null) {
            alert("You can't send a blank comment")
            return
        }

        e.target['content'].value = '';

        if(id){
            createComment(content,id).then((comment) => {
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

    function handleClick() {
        navigate('/focus-post/' + id)
    }
    
    function handleDeleteComment(e){
        e.preventDefault();
        deleteComment(e.target.parentNode.parentNode.parentNode.id).then((data) =>{
            console.log(data)
            refresh()
        })
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
        e.preventDefault();

        if(document.getElementById('post-gif-search-'+id).style.display == 'none'){
            document.getElementById('post-gif-search-'+id).style.display = 'block'
        }
        else{
            document.getElementById('post-gif-search-'+id).style.display = 'none'
        }

    }

    function handleInputImage(e){
        e.preventDefault();

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