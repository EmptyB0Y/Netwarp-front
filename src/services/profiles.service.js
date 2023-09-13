import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/profiles/"

export const createProfile =  async (token, username, description="") => {

    const options = {
        headers: { Authorization: 'Bearer '+token }
    };

    const bodyParameters = {
        username : username,
        description : description
        };
    
    return axios.post(BASE_URL, bodyParameters,options)
      .then((res) => {return res.data;})
      .catch((err) => err)
}

export const getProfile = async (userId) => {

    const options = {
        headers: { Authorization: 'Bearer '+sessionStorage.getItem("token") }
    };

    return axios.get(BASE_URL+userId,options)
      .then((res) => {return res.data;})
      .catch((err) => err)
}

export const textSearchProfiles = async (query) => {
    const options = {
        headers: { Authorization: 'Bearer '+sessionStorage.getItem("token") }
    };

    const bodyParameters = {
        query : query
    };
    
    return axios.post(BASE_URL+"search", bodyParameters,options)
      .then((res) => {return res.data;})
      .catch((err) => err)
}

export const editProfile = async (id,username,description,pictureUrl=null) => {

    const options = {
        headers: { Authorization: 'Bearer '+sessionStorage.getItem("token") }
    };

    const bodyParameters = {
        username : username,
        description : description
    };
    
    if(pictureUrl != null) {
        bodyParameters.pictureUrl = pictureUrl;
    }

    return axios.put(BASE_URL+id, bodyParameters,options)
      .then((res) => {return res.data.dataValues;})
      .catch((err) => err)
}

export const getUser = async (id) =>{
        
    const options = {
        headers: { Authorization: 'Bearer '+sessionStorage.getItem("token") }
    };

    return axios.get(process.env.REACT_APP_BASE_URL+'/users/'+id, options)
      .then((res) => {return res.data;})
      .catch((err) => err)
}

export const deleteUser = async (id,password) =>{
    
    const options = {
        headers: { Authorization: 'Bearer '+sessionStorage.getItem("token") },
        data : {
            password : password
        }
    };

    return axios.delete(process.env.REACT_APP_BASE_URL+'/users/'+id, {
        headers: { Authorization: 'Bearer '+sessionStorage.getItem("token") },
        data: {
            password : password
        }
    })
      .then((res) => {return res.data;})
      .catch((err) => err)
}

export const getNotificationsByProfile = async (id) => {
    const options = {
        headers: { Authorization: 'Bearer '+sessionStorage.getItem("token") }
    };

    return axios.get(BASE_URL+id+'/notifications',options)
      .then((res) => {return res.data;})
      .catch((err) => err)
}

export const deleteNotification = async (id) => {
    const options = {
        headers: { Authorization: 'Bearer '+sessionStorage.getItem("token") }
    };

    return axios.delete(BASE_URL+'notifications/'+id,options)
      .then((res) => {return res.data;})
      .catch((err) => err)
}