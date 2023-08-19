import '../styles/Home.css'
import arrow from '../assets/Icons/arrow-right.webp'
import plus from '../assets/Icons/plus.png'
import { Post } from './Post'
import { Searchbar } from './Searchbar'
import { useState, useEffect } from 'react'
import { getPosts, createPost, deletePost } from '../services/posts.service'
import TextareaAutosize from 'react-textarea-autosize'
import { GifSearch } from './GifSearch'
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { uploadPhoto } from '../services/posts.service';

export const Home = () => {
    let { topicDefault } = useParams();
    console.log(topicDefault);
    
    const [posts, setPosts] = useState([]);
    const [load,setLoad] = useState(false);
    const [change,setChange] = useState(false);
    const [topic,setTopic] = useState(topicDefault);
    const [image,setImage] = useState(null);

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
        <div className='post' id={'post-'+post.id} key={'post-'+post.id}>
            <Post ProfileId={post.ProfileId} MissionId={post.MissionId} content={post.content} topic={post.topic} id={post.id} deleteFunction={handleDeletePost} createdAt={post.createdAt}/> 
        </div>))

        if(posts === []){
            postsElement = (<div>No posts yet, be the first to publish !</div>)
        }
    }

    if(sessionStorage.getItem('token')) {
        return (
            <div id='home-root-container'>  
                    <Link id='topics' to='/topics'>Topics</Link>
                    <Searchbar />
                    <form id='topic-form' onSubmit={(e) => handleTopicChange(e)}>
                        <input id='topic-input' name='content'/>
                        <button id='topic-submit' type='submit'><img alt='submit' id='topic-submit-icon' src={arrow}/></button>
                    </form>
                    <p id='topic'>#{topic}</p>
                    <form id='add-post-form' onSubmit={(e) => handleSubmit(e)}>
                        <TextareaAutosize id='post-input' role='textbox' placeholder="Something to say ?" name="content" rows="4"/>
                        <button id='post-submit' type='submit'><img alt='submit' id='post-submit-icon' src={arrow}/></button>
                        <div className='gif-search' id='gif-search' style={{display: 'none'}}>
                            <GifSearch place={'post-input'}/>
                        </div>
                        <div className='media'>
                            <img alt='Gifs' className='gifs-anchor' src={plus} onClick={(e) => handleClickGifSearch(e)}></img>                    
                            <input type='file' id='upload' onInput={(e) => handleInputImage(e)} width='20' height='20' multiple/>
                        </div>
                    </form>

                <div id='posts'>
                    {postsElement}
                </div>
            </div>
        )
    }

    return (
        <div id='home-root-container'>
            <Link id='topics' to='/topics'>Topics</Link>
            <Searchbar />
            <div id='posts'>
                {postsElement}
            </div>
        </div>
    )

    function handleTopicChange(e){
        e.preventDefault()
        e.stopPropagation()
        let t = e.target['content'].value;
        if(t == ''){
            t = 'general';
        }
        setTopic(t)
    }

    function handleSubmit(e){
        e.preventDefault()
        e.stopPropagation()

        if(e.target['content'].value !== "" || image != null){
            
            createPost(e.target['content'].value,topic).then( (post) => {
                                
                if(image != null){
                    console.log("image submitted");
                    uploadPhoto(post.id,image).then(() => {
                        console.log("Image uploaded successfully");
                    });
                }
                refresh()
                e.target['content'].value = '';
            })
        }

    }

    function handleDeletePost(e){
        console.log((e.target.parentNode.parentNode.parentNode.id.substring(5)))
        deletePost(e.target.parentNode.parentNode.parentNode.id.substring(5)).then((data) =>{
            console.log(data)
            refresh()
        })
    }

    function handleClickGifSearch(e){

        if(document.getElementById('gif-search').style.display == 'none'){
            document.getElementById('gif-search').style.display = 'block'
        }
        else{
            document.getElementById('gif-search').style.display = 'none'
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