import { useState, useEffect } from 'react'
import workoutService from '../services/workouts'
import { NavLink } from 'react-router-dom'

const LikesListDisplay = ({ likes, id }) => {
    
    const [likesToDisplay, setLikesToDisplay] = useState([])

    useEffect(() => {
        const getWorkoutLikes = async () => {
            let response = await workoutService.getLikes(id)
            
            setLikesToDisplay(response.likes)
        } 
        getWorkoutLikes()
    }, [likes])

    if (likesToDisplay.length > 0) {
        return (
            <div className='follows-list-display'> 
                {likesToDisplay.map(person => 
                    <NavLink key={person.id} className='users-list-link-to-profile' to={`/profile/${person.username}`} >
                        <p>{person.name}</p>
                    </NavLink>  
                )}
            </div> 
        )
    }
}

export default LikesListDisplay