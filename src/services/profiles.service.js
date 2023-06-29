import axios from "axios";
import {ReactSession} from 'react-session'

const BASE_URL = "http://127.0.0.1:3000/profiles/"

export const createProfile = (username, description) => {

    const options = {
        headers: { Authorization: 'Bearer '+ReactSession.getItem("token") }
    };

    const bodyParameters = {
        username : username,
        description : description
        };
    
    return axios.post(BASE_URL, bodyParameters,options)
      .then((res) => {return res.data;})
      .catch((err) => err)
}