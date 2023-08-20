import '../styles/FocusComment.css';
import arrow from '../assets/Icons/arrow-right.webp'
import { getCommentById } from '../services/comments.service';
import { Comment } from './Comment'
import { useState, useEffect } from 'react'
import { useParams } from "react-router";
import {useNavigate} from "react-router-dom";
import { deleteComment } from '../services/comments.service'

export const FocusComment = () => {
    const [comment,setComment] = useState(null);
    let { id } = useParams();

    let navigate = useNavigate();

    useEffect(() => {
        getCommentById(id)
        .then(data => {
            console.log(data);
            setComment(data)
        })
        .catch((err) => console.log(err))
  }, [id])
  
    if(comment !== null){
        return (
            <div id='focus-comment-root-container'>    
                <img alt='Go back' onClick={() => window.history.back()} id='arrow-back' src={arrow}></img>
                <Comment ProfileId={comment.ProfileId}  PostId={comment.PostId} content={comment.content} id={comment.id} level={0} deleteFunction={handleDeleteComment} upvotes={comment.upvotes} createdAt={comment.createdAt} />
            </div>
        )
    }

    return (
        <div id='home-root-container'>
            <p>...</p>
        </div>
        )

    function handleDeleteComment(e){
        deleteComment(id).then((data) =>{
            console.log(data)
            navigate('/home/general')
        })
    }
}