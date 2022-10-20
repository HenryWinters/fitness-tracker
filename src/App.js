import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css';
import workoutService from './services/workouts'
import Login from './components/Login'
import TopNav from './components/TopNav'
import BottomNav from './components/BottomNav'
import Home from './components/Home'
import Workouts from './components/Workouts'
import Profile from './components/Profile'
import WorkoutForm from './components/WorkoutForm'

function App() {
  const [user, setUser] = useState(null)
  const [workouts, setWorkouts] = useState([])
  const [notification, setNotification] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedFitnessAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      workoutService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return (
      <div className="App">
        <Login setUser={setUser} setNotification={setNotification} /> 
      </div>
    )
  } else 
    return (
      <div>
        <TopNav user={user} setNotification={setNotification} /> 
        <Routes>
          <Route path='home' element={<Home />} /> 
          <Route path='workouts' element={<Workouts />} /> 
          <Route path='profile' element={<Profile user={user} workouts={workouts} setWorkouts={setWorkouts} />} /> 
          <Route path='workout' element={<WorkoutForm />} />
        </Routes>
        <BottomNav /> 
      </div> 
    )
}

export default App;
