import axios from "axios";

const BASE_URL = "http://127.0.0.1:3000/comments/"

export const getCommentById= async (commentId) => {

    const options = {
        headers: { Authorization: 'Bearer '+sessionStorage.getItem("token") }
    };
    
    return axios.get(BASE_URL+commentId,options)
      .then((res) => {return res.data;})
      .catch((err) => err)
}

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
    if(content === null || content === ""){
        alert("You can't send a blank comment")
        return
    }
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

export const upvoteComment = async (commentId) => {
    const options = {
        headers: { Authorization: 'Bearer '+sessionStorage.getItem("token") }
    };

    const bodyParameters = {
    }

    return axios.post(BASE_URL+commentId+"/upvote",bodyParameters, options)
      .then((res) => {return res.data;})
      .catch((err) => err)
}

export const deleteComment = async (commentId) => {

    const options = {
        headers: { Authorization: 'Bearer '+sessionStorage.getItem("token") }
    };

    return axios.delete(BASE_URL+commentId,options)
      .then((res) => {return res.data;})
      .catch((err) => err)
}