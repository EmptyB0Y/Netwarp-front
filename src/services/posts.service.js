import axios from "axios";

const BASE_URL = "http://127.0.0.1:3000/posts/"

export const getPosts = async (topic) => {

    const options = {
        headers: { Authorization: 'Bearer '+sessionStorage.getItem("token") }
    };

    
    return axios.get(BASE_URL+topic,options)
      .then((res) => {return res.data;})
      .catch((err) => err)
}