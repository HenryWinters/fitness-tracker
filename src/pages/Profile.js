import { useEffect } from "react"
import Workout from '../components/Workout'
import workoutService from '../services/workouts'

const Profile = ({ user, workouts, setWorkouts }) => {

    useEffect(() => {
        const getWorkouts = async () => {
            const userWorkouts = await workoutService.getUserWorkouts(user.id)
            setWorkouts(userWorkouts)
        } 
        getWorkouts()
    }, [user])

    if (workouts.length >= 1) {

        return (
            <div>
                {workouts.map(workout => 
                    <Workout key={workout.id} workout={workout} /> 
                )}
            </div> 
        )
    } else {
        return (
            <p>No workouts yet! Click "Add Workout" to start your first log.</p> 
        )
    }
}

export default Profile