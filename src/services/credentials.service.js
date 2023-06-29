import axios from "axios";

const BASE_URL = "http://127.0.0.1:3000/auth/"

export const loginUser = async (email,password) =>{
    const bodyParameters = {
        email : email,
        password : password
        };
    
    return axios.post(BASE_URL + 'login/',bodyParameters)
      .then((res) => {return res.data;})
      .catch((err) => err)
}

export const signupUser = async (email,password, superPassword = null) =>{

    const bodyParameters = {
        email : email,
        password : password
        };

    if(superPassword !== null){
        bodyParameters.superPassword = superPassword;
    }

    return axios.post(BASE_URL + 'signup/',bodyParameters)
      .then((res) =>  {
        return res.data;
    })
      .catch((err) => err)
}