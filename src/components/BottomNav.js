import '../index.css'
import { Link } from 'react-router-dom'

const BottomNav = ({user, setNotification}) => {

    return (
        <div id='bottom-nav-bar'>
            <Link to='/home'>Home</Link>
            <Link to='/workouts'>Workouts</Link>
            <Link to ='/profile'>Profile</Link>
        </div> 
    )
}

export default BottomNav