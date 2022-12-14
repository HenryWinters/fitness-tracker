import { useState, useEffect } from 'react'
import { Outlet, Routes, Route, Navigate, Link } from 'react-router-dom'
import './App.css';
import workoutService from './services/workouts'
import userService from './services/users'
import Login from './pages/Login'
import TopNav from './components/TopNav'
import BottomNav from './components/BottomNav'
import Notification from './components/Notification'
import Home from './pages/Home'
import Workouts from './pages/Workouts'
import Profile from './pages/Profile'
import WorkoutForm from './pages/WorkoutForm'
import Register from './pages/Register'
import Users from './pages/Users'
import EditProfile from './pages/EditProfile'

function App() {
  const [user, setUser] = useState(null)
  const [workouts, setWorkouts] = useState([])
  const [notification, setNotification] = useState({ message: null, type: null })
  const [following, setFollowing] = useState([]) 

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedFitnessAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      workoutService.setToken(user.token)
      userService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      const getUserInfo = async () => {
        const response = await userService.getWhoUserIsFollowing(user.username)
        setFollowing(response)
      } 
      getUserInfo()
    }
  }, [user])
  
  if (user === null) {
    return (
      <div className="App">
        <Notification notification={notification} />
        <Routes> 
          <Route path='/' element={<Login setUser={setUser} setNotification={setNotification} />} /> 
          <Route path='register' element={<Register setNotification={setNotification} />} />
        </Routes> 
      </div>
    )
  } else 
    return (
      <div className='website-container'>
        <TopNav user={user} setNotification={setNotification} /> 
        <Notification notification={notification} />
        <Routes>
          <Route path='/' element={<> </>} />
          <Route path='home' element={<Home user={user} workouts={workouts} setWorkouts={setWorkouts} following={following} setFollowing={setFollowing} setNotification={setNotification} />} /> 
          <Route path='workouts/:username' element={<Workouts user={user} workouts={workouts} setWorkouts={setWorkouts} following={following} setFollowing={setFollowing} setNotification={setNotification} />} /> 
          <Route path='profile/:username' element={<Profile user={user} following={following} setFollowing={setFollowing} />} /> 
          <Route path='workout' element={<WorkoutForm setNotification={setNotification} />} />
          <Route path='users' element={<Users user={user} setUser={setUser} following={following} setFollowing={setFollowing} />} />
          <Route path='profile/edit' element={<EditProfile user={user} setNotification={setNotification} />} />
        </Routes>
        <BottomNav user={user} /> 
      </div> 
    )
}

export default App;
