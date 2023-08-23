import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/comments/"

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

    
    return axios.get(process.env.REACT_APP_BASE_URL+"/posts/" + PostId +"/comments/",options)
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

export const getPhotos = async (id) => {
    const options = {
        headers: { Authorization: 'Bearer '+sessionStorage.getItem("token") }
    };

    return axios.get(BASE_URL + id +'/photos',options)
        .then((res) => {return res.data;})
        .catch((err) => err)
}

export const uploadPhoto = async (id,file) => {
    const options = {
        headers: { Authorization: 'Bearer '+sessionStorage.getItem("token") }
    };

    let fm = new FormData();
    fm.append('image', file);
    console.log(BASE_URL + id +'/upload-photo');
    return axios.post(BASE_URL + id +'/upload-photo',fm,options)
        .then((res) => {return res.data;})
        .catch((err) => err)
}