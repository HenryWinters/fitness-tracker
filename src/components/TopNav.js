import '../index.css'
import { useLocation } from 'react-router-dom'

const TopNav = ({user, setNotification}) => {
    const location = useLocation()

    const handleLogOut = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedFitnessAppUser')
        window.location.reload(false)
        setNotification({ message: `${user.name} logged out`, type: 'error' })
        setTimeout(() => {
          setNotification({ message: null, type: null })
        }, 5000)
    }

    const addWorkout = (event) => {
        event.preventDefault()
        console.log('Add Workout')
    }

    const editPathName = (string) => {
        return string.charAt(1).toUpperCase() + string.slice(2)
    }

    return (
        <div id='top-nav-bar'>
            <button onClick={addWorkout}>Add Workout</button> 
            <h1>{editPathName(location.pathname)}</h1>
            <button onClick={handleLogOut}>Log Out</button> 
        </div> 
    )
}

export default TopNav