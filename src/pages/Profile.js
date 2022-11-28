import { useEffect, useState } from 'react'
import userService from '../services/users'
import { useParams, useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faDumbbell, faXmarkCircle, faEdit } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'
import { FollowButton, UnfollowButton } from '../components/FollowButtons'
import FollowListDisplay from '../components/FollowListDisplay'

const Profile = ({ user, following, setFollowing, setNotification }) => {
    const [userInformation, setUserInformation] = useState([])
    const [visible, setVisible] = useState({ display: 'none' })
    const [followType, setFollowType] = useState('')

    const params = useParams()
    const username = params.username

    const location = useLocation()

    const handleFollowListClose = () => {
        setFollowType('')
        setVisible({ display: 'none' })
    }
    /*get user profile to view based on url parameter*/ 
    useEffect(() => {
        const getUser = async () => {
            const userObject = await userService.getUser(username)
            setUserInformation(userObject[0]) 
        } 
        getUser()
    }, [username, following])

    /* getting array of who user is following */ 
    useEffect(() => {
        const getWhoUserFollowing = async () => {
            const userFollowing = await userService.getWhoUserIsFollowing(user.username)
            setFollowing(userFollowing)
        } 
        getWhoUserFollowing()
    }, [])

    useEffect(() => {
        handleFollowListClose()
    }, [location])

    if (userInformation.length !== 0) {

        const personalProfileCheck = () => user.username === params.username 

        const followingCheck = () => following.includes(userInformation.id)

        const date = new Date(userInformation.registerDate)

        const userIconColor = { 
            backgroundColor: `${userInformation.color}` 
        }

        const handleFollowersClick = () => { 
            setFollowType('followers')
            setVisible({ display: 'flex' })
        }   
        
        const handleFollowingClick = () => {
            setFollowType('following')
            setVisible({ display: 'flex' })
        }

        return (
            <div>
                {personalProfileCheck()
                ? <NavLink to='/profile/edit' className='edit-profile-link'>
                    <p>Edit profile</p> 
                    <FontAwesomeIcon className='edit-icon' icon={faEdit} />
                  </NavLink>  
                : <></>}
                <div className='profile-heading-container'>
                    <FontAwesomeIcon className='userIcon' icon={faUser} style={userIconColor} />
                    <h1>{userInformation.name}</h1>
                    {personalProfileCheck()
                    ? <></> 
                    : followingCheck()
                    ? <UnfollowButton className='profile-unfollow-button' userToUnfollow={userInformation.id} userToken={user.token} userUsername={user.username} setFollowing={setFollowing} /> 
                    : <FollowButton className='profile-follow-button' userToFollow={userInformation.id} userToken={user.token} userUsername={user.username} setFollowing={setFollowing} />}
                    <p>{userInformation.city}</p>
                    <p>{userInformation.bio}</p>
                    <p>Member since {format(date, "PPPP")}</p>
                </div> 
                <div className='follow-container'>
                    <button onClick={handleFollowersClick}>
                        <p>Followers</p> 
                        <p>{userInformation.followers.length}</p>
                    </button> 
                    <button onClick={handleFollowingClick}> 
                        <p>Following</p>
                        <p>{userInformation.following.length}</p> 
                    </button> 
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
                <div className='follow-list-display-container' style={visible}> 
                    <FontAwesomeIcon className='close-follow-list-button' icon={faXmarkCircle} onClick={handleFollowListClose} /> 
                    <h3>{userInformation.name}'s {followType.charAt(0).toUpperCase() + followType.slice(1)}</h3> 
                    <FollowListDisplay username={userInformation.username} followType={followType} following={following} setFollowing={setFollowing} user={user} /> 
                </div> 
            </div> 
        )
    }
}

export default Profile

