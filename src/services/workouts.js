import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/workouts'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request 
}

const addWorkout = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data 
}

const exportedObject = {
  setToken, 
  getAll,
  addWorkout
}

export default exportedObject