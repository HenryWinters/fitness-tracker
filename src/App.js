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
        <Routes>
          <Route path='/' element={<> </>} />
          <Route path='home' element={<Home user={user} workouts={workouts} setWorkouts={setWorkouts} />} /> 
          <Route path='workouts/:username' element={<Workouts user={user} workouts={workouts} setWorkouts={setWorkouts} />} /> 
          <Route path='profile/:username' element={<Profile user={user} />} /> 
          <Route path='workout' element={<WorkoutForm />} />
          <Route path='users' element={<Users user={user} setUser={setUser} following={following} setFollowing={setFollowing} />} />
        </Routes>
        <BottomNav user={user} /> 
      </div> 
    )
    
  
    /*

    const ProtectedRoute = ({ children }) => {
      if (user === null) {
        return <Navigate to='/login' /> 
      }
      return children; 
    }

    const PagesWithNavbars = () => {
    return (
      <div> 
        <TopNav user={user} setNotification={setNotification} /> 
        <Outlet /> 
        <BottomNav />
      </div>  
    )
    }

    return (
        <Routes>
          <Route path='/' element={<PagesWithNavbars />}>
            <Route path='home' element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>} /> 
            <Route path='workouts' element={<Workouts user={user} workouts={workouts} setWorkouts={setWorkouts} />} /> 
            <Route path='profile' element={<Profile />} /> 
            <Route path='workout' element={<WorkoutForm />} />
          </Route> 
          <Route path='/login' element={<Login setUser={setUser} setNotification={setNotification} />} />
          <Route path='register' element={<Register setUser={setUser} />} />
        </Routes> 
    )   */  
}

export default App;
