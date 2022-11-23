import { useState, useEffect } from 'react'
import workoutService from '../services/workouts'
import User from './User'
import { NavLink } from 'react-router-dom'

const LikesListDisplay = ({ likes, id, user, following, setFollowing }) => {
    
    const [likesToDisplay, setLikesToDisplay] = useState([])

    useEffect(() => {
        const getWorkoutLikes = async () => {
            let response = await workoutService.getLikes(id)
            
            setLikesToDisplay(response.likes)
        } 
        getWorkoutLikes()
    }, [likes])

    console.log(likesToDisplay)

    if (likesToDisplay.length > 0) {
        /*return (
            <div className='follows-list-display'> 
                {likesToDisplay.map(person => 
                    <NavLink key={person.id} className='users-list-link-to-profile' to={`/profile/${person.username}`} >
                        <p>{person.name}</p>
                    </NavLink>  
                )}
            </div> 
        )*/
        return (
            <div> 
                {likesToDisplay.map(person => 
                    <User key={person.id} user={user} id={person.id} name={person.name} username={person.username} city={person.city} following={following} setFollowing={setFollowing} />
                )}
            </div> 
        )
    }
}

export default LikesListDisplay