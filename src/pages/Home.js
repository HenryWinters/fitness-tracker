import { useEffect } from 'react'
import Workout from '../components/Workout'
import workoutService from '../services/workouts'
import userService from '../services/users'

const Home = ({ user, workouts, setWorkouts }) => {

    useEffect(() => {
        const getWorkouts = async () => {
            const userAndFollowingWorkouts = await workoutService.getUserAndFollowingWorkouts(user.username)
            setWorkouts(userAndFollowingWorkouts)
        } 
        getWorkouts()
    }, [user.username])

    if (workouts.length >= 1) {

        return (
            <div className='workouts-container-profile'>
                {workouts.map(workout => 
                    <Workout key={workout.id} workout={workout} user={user} setWorkouts={setWorkouts} /> 
                )}
            </div> 
        )
    } else {
        return (
            <div className='no-workouts-to-display-profile'> 
                <p>No workouts yet! Click "Add Workout" to start your first log.</p> 
            </div> 
        )
    }
}

export default Home 