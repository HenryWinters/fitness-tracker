import { useState, useEffect } from 'react'
import './App.css';
import Login from './components/Login'

function App() {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')

  return (
    <div className="App">
      <Login setUser={setUser} setNotification={setNotification} /> 
    </div>
  );
}

export default App;
