import '../index.css'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faDumbbell, faUser } from '@fortawesome/free-solid-svg-icons'

const BottomNav = ({user, setNotification}) => {

    return (
        <div id='bottom-nav-bar'>
            <NavLink className={({ isActive }) => 'bottom-nav-link' + (isActive ? ' active-nav-link' : '')} to='/home'>
                <FontAwesomeIcon className='bottom-nav-icon' icon={faHouse} />
                <p>Home</p> 
            </NavLink>
            <NavLink className={({ isActive }) => 'bottom-nav-link' + (isActive ? ' active-nav-link' : '')} to={`/workouts/${user.username}`}>
                <FontAwesomeIcon className='bottom-nav-icon' icon={faDumbbell} />
                <p>Workouts</p>   
            </NavLink>
            <NavLink className={({ isActive }) => 'bottom-nav-link' + (isActive ? ' active-nav-link' : '')} to={`/profile/${user.username}`}>
                <FontAwesomeIcon className='bottom-nav-icon' icon={faUser} />
                <p>Profile</p> 
            </NavLink>
            
        </div> 
    )
}

export default BottomNav