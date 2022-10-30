import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const addUser = async (newUserObject) => {
    const response = await axios.post(baseUrl, newUserObject)
    return response.data 
}

const exportedObject = {
    addUser
}

export default exportedObject