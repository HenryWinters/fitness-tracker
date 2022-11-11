import { useEffect, useState } from 'react'
import userService from '../services/users'
import { useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'

const Profile = ({ user }) => {
    const [userInformation, setUserInformation] = useState([])

    const params = useParams()
    const username = params.username

    useEffect(() => {
        const getUser = async () => {
            const userObject = await userService.getUser(username)
            setUserInformation(userObject[0])
        } 
        getUser()
    }, [username])

    if (userInformation.length !== 0) {

        const personalProfileCheck = () => user.username === params.username 

        const date = new Date(userInformation.registerDate)

        const userIconColor = { 
            backgroundColor: `${userInformation.color}` 
        }

        return (
            <div>
                <div className='profile-heading-container'>
                    <FontAwesomeIcon className='userIcon' icon={faUser} style={userIconColor} />
                    <h1>{userInformation.name}</h1>
                    <p>{userInformation.city}</p>
                    <p>{userInformation.bio}</p>
                    <p>Member since {format(date, "PPPP")}</p>
                </div> 
                <div className='follow-container'>
                    <div>
                        <p>Followers</p> 
                        <p>{userInformation.followers.length}</p>
                    </div> 
                    <div> 
                        <p>Following</p>
                        <p>{userInformation.following.length}</p> 
                    </div> 
                </div>
                <div className='profile-stats-container'> 
                    <div>
                        <p>Workouts</p>
                        <p>{userInformation.workoutCount}</p> 
                    </div> 
                    <div>
                        <p>Exercises</p>
                        <p>{userInformation.exerciseCount}</p> 
                    </div> 
                    <div> 
                        <p>Sets</p>
                        <p>{userInformation.setCount}</p>  
                    </div>
                    <div> 
                        <p>Reps</p> 
                        <p>{userInformation.repCount}</p>
                    </div> 
                </div>
                <div className='profile-workouts-link-container'> 
                    <NavLink className='profile-workouts-link' to={`/workouts/${userInformation.username}`}>
                        <FontAwesomeIcon className='bottom-nav-icon' icon={faDumbbell} />
                        {personalProfileCheck() 
                        ? <p>View your workouts</p>   
                        : <p>View {userInformation.name}'s workouts</p>}
                    </NavLink>
                </div> 
                <NavLink to={'/users'}>
                    <p>Add followers</p>
                </NavLink>
            </div> 
        )
    }
}

export default Profile

