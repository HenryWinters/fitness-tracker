import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

let token = null 

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const addUser = async (newUserObject) => {
    const response = await axios.post(baseUrl, newUserObject)
    return response.data 
}

const getUser = async (username) => {
    const response = await axios.get(baseUrl + '/' + username)
    return response.data
}

const getAllUsers = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const addFollow = async (id) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.patch(baseUrl + '/follow/' + id, {id}, config)
    return response.data
}

const exportedObject = {
    addUser, 
    getUser, 
    getAllUsers, 
    addFollow, 
    setToken
}

export default exportedObject