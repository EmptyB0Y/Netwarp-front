import axios from "axios";

const BASE_URL = "http://127.0.0.1:3000/comments/"

export const getCommentsByPost = async (PostId) => {

    const options = {
        headers: { Authorization: 'Bearer '+sessionStorage.getItem("token") }
    };

    
    return axios.get("http://127.0.0.1:3000/posts/" + PostId +"/comments/",options)
      .then((res) => {return res.data;})
      .catch((err) => err)
}

export const getCommentsByComment = async (CommentId) => {

    const options = {
        headers: { Authorization: 'Bearer '+sessionStorage.getItem("token") }
    };

    
    return axios.get(BASE_URL+CommentId+'/comments',options)
      .then((res) => {return res.data;})
      .catch((err) => err)
}

export const createComment = async (content, postId, commentId=null) => {
    const options = {
        headers: { Authorization: 'Bearer '+sessionStorage.getItem("token") }
    };

    const bodyParameters = {
        content : content,
         postId : postId,
         commentId : commentId
        };

    return axios.post(BASE_URL, bodyParameters,options)
      .then((res) => {return res.data;})
      .catch((err) => err)
}