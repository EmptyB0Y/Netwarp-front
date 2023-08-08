import axios from "axios";

const BASE_URL = "http://127.0.0.1:3000/posts/"

export const getPosts = async (topic) => {

    const options = {
        headers: { Authorization: 'Bearer '+sessionStorage.getItem("token") }
    };

    
    return axios.get(BASE_URL+"topic/"+topic,options)
      .then((res) => {return res.data;})
      .catch((err) => err)
}

export const getPost = async (id) => {

    const options = {
        headers: { Authorization: 'Bearer '+sessionStorage.getItem("token") }
    };

    console.log(BASE_URL+id)
    return axios.get(BASE_URL+id,options)
      .then((res) => {return res.data;})
      .catch((err) => err)
}

export const createPost = async (content, topic) => {
    const options = {
        headers: { Authorization: 'Bearer '+sessionStorage.getItem("token") }
    };

    const bodyParameters = {
        content : content,
        topic : topic
        };
    
    return axios.post(BASE_URL, bodyParameters,options)
      .then((res) => {return res.data;})
      .catch((err) => err)
}

export const deletePost = async (id) => {
    const options = {
        headers: { Authorization: 'Bearer '+sessionStorage.getItem("token") }
    };

    return axios.delete(BASE_URL+id,options)
      .then((res) => {return res.data;})
      .catch((err) => err)
}