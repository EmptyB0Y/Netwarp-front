import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/profiles/"

export const createProfile =  async (username, description="") => {

    const options = {
        headers: { Authorization: 'Bearer '+sessionStorage.getItem("token") }
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