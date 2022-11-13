import { useState, useEffect } from 'react'
import userService from '../services/users'

const FollowListDisplay = ({ username, followType }) => {
    
    const [followsToDisplay, setFollowsToDisplay] = useState([])

    useEffect(() => {
        const getFollows = async () => {
            let display = []
            followType === 'following' 
            ? display = await userService.getWhoUserIsFollowing(username)
            : display = await userService.getUsersFollowers(username)
            setFollowsToDisplay(display)
        } 
        getFollows()
    }, [])

    console.log(followsToDisplay)

    return (
        <div> 
            
        </div> 
    )
}