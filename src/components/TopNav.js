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
        navigate('/')
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
        const firstPartOfPathName = string.split('/')[1]
        return firstPartOfPathName.charAt(0).toUpperCase() + firstPartOfPathName.slice(1)
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