import axios from 'axios'
const baseUrl = '/api/workouts'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data 
}

const getUserWorkouts = async (username) => {
  const response = await axios.get(baseUrl + '/'+ username)
  return response.data  
}

const getUserAndFollowingWorkouts = async (username) => {
  const response = await axios.get(baseUrl + '/' + username + '/feed')
  return response.data
}

const getWorkout = async (id) => {
  const response = await axios.get(baseUrl + '/workout/' + id)
  return response.data
}

const addWorkout = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data 
}

const deleteWorkout = async (id) => {
  const config = {
    headers: { Authorization: token }, 
  }
  const response = await axios.delete(baseUrl + '/' + id, config)
  return response.data 
}

const addLike = async (id) => {
  const config = {
    headers: { Authorization: token }, 
  }
  const response = await axios.patch(baseUrl + '/like/' + id, {id}, config)
  return response.data
}

const removeLike = async (id) => {
  const config = {
    headers: { Authorization: token }, 
  }
  const response = await axios.patch(baseUrl + '/unlike/' + id, {id}, config)
  return response.data
}

const getLikes = async (id) => {
  const response = await axios.get(baseUrl + '/' + id + '/likes')
  return response.data
}

const exportedObject = {
  setToken, 
  getAll,
  getUserWorkouts,
  getUserAndFollowingWorkouts,
  getWorkout,
  addWorkout, 
  deleteWorkout, 
  addLike, 
  removeLike, 
  getLikes
}

export default exportedObject