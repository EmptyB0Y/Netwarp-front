import { useState, useEffect } from 'react'
import { getCommentsByComment, getCommentsByPost } from '../services/comments.service';
import { Comment } from './Comment'

export const Comments = ({PostId=null, CommentId=null, level=0}) => {
    const [comments,setComments] = useState([]);
    const [done, setDone] = useState(false);

    useEffect(() => {
        if(!done){
            console.log("NOT DONE")
            if(CommentId){
                getCommentsByComment(CommentId)
                .then(data => {
                    if(data){
                        setComments(data)
                    }
                    setDone(true)
                })
                .catch((err) => console.log(err))
            }
            else if(PostId){
                getCommentsByPost(PostId)
                .then(data => {
                    if(data){
                        setComments(data)
                    }
                    setDone(true)
                })
                .catch((err) => console.log(err))
            }
        }
      }, [comments, done, level, CommentId, PostId])

      if(comments.length > 0 && done){
        let levelDone = level + 1

        return (
            <div className='comments'>
                {comments.map(comment =>
                    <div style={{marginLeft: level*50+'px'}} className='comment' id={comment.id} key={comment.id}>
                        <p>{level}</p>
                        <Comment ProfileId={comment.ProfileId} PostId={comment.PostId} CommentId={comment.CommentId} content={comment.content} id={comment.id} level={levelDone}/>
                    </div>
                )}
            </div>
        )
      }

      return (
      <div className='comments'>
      </div>
      )
}