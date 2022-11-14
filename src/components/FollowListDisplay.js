import { useState, useEffect } from 'react'
import userService from '../services/users'
import User from './User'

const FollowListDisplay = ({ username, followType, following, setFollowing, user }) => {
    
    const [followsToDisplay, setFollowsToDisplay] = useState([])

    useEffect(() => {
        const getFollows = async () => {
            let display = []
            followType === ''
            ? display = [] 
            : followType === 'following' 
            ? display = await userService.getUsersFollowingNames(username)
            : display = await userService.getUsersFollowersNames(username)
            setFollowsToDisplay(display)
        } 
        getFollows()
    }, [username, following, followType])

    return (
        <div className='follow-list-display'> 
            {followsToDisplay.map(person => <User key={person.id} user={user} id={person.id} name={person.name} username={person.username} city={person.city} following={following} setFollowing={setFollowing} />)}
        </div> 
    )
}

export default FollowListDisplay