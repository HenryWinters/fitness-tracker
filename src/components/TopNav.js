import '../index.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'

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

    const navigateToAddWorkout = (event) => {
        event.preventDefault()
        navigate('/workout')
    }

    const navigateToUsers = (event) => {
        event.preventDefault()
        navigate('/users')
    }

    const editPathName = (string) => {
        const firstPartOfPathName = string.split('/')[1]
        return firstPartOfPathName.charAt(0).toUpperCase() + firstPartOfPathName.slice(1)
    }

    return (
        <div id='top-nav-bar'>
            <div className='top-nav-left-actions top-nav-section'>
                <button className='top-nav-button' onClick={navigateToAddWorkout}>
                    <FontAwesomeIcon icon={faPlus} />
                    <p>Add Workout</p>
                </button> 
                <button className='top-nav-button' onClick={navigateToUsers}> 
                    <FontAwesomeIcon icon={faUser} />
                    <p>Find Users</p>
                </button> 
            </div> 
            <h1>{editPathName(location.pathname)}</h1>
            <button className='top-nav-button top-nav-section' onClick={handleLogOut}>
                <p>Log Out</p> 
                <FontAwesomeIcon icon={faRightFromBracket} />
            </button> 
        </div> 
    )
}

export default TopNav