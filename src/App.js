import { useState, useEffect } from 'react'
import './App.css';
import workoutService from './services/workouts'
import Login from './components/Login'
import TopNav from './components/TopNav'

function App() {
  const [user, setUser] = useState(null)
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
    );
  } else return (
    <div className="App">
      <TopNav user={user} setNotification={setNotification} />
    </div>
  );
}

export default App;
