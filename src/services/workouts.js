import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/workouts'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { setToken }