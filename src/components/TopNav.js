import '../index.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const TopNav = ({user, setNotification}) => {
    const location = useLocation()
    const navigate = useNavigate()

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
        navigate('/workout')
    }

    const editPathName = (string) => {
        return string.charAt(1).toUpperCase() + string.slice(2)
    }

    return (
        <div id='top-nav-bar'>
            <button className='top-nav-button' onClick={addWorkout}>
                <FontAwesomeIcon icon={faPlus} />
                <p>Add Workout</p>
            </button> 
            <h1>{editPathName(location.pathname)}</h1>
            <button className='top-nav-button' onClick={handleLogOut}>
                <p>Log Out</p> 
                <FontAwesomeIcon icon={faRightFromBracket} />
            </button> 
        </div> 
    )
}

export default TopNav