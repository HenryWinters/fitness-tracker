import { useState } from 'react'
import ExerciseTable from './ExerciseTable'
import { format } from 'date-fns'

const Workout = ({workout}) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {
        display: visible ? 'none' : 'flex',
    }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const totalSets = workout.workout.length
    const totalReps = workout.workout.reduce((accumulator, value) => {
        return accumulator + parseInt(value.reps)
    }, 0)

    const WorkoutDetails = () => {

        const date = new Date(workout.workoutTime)

        return (
            <div>
                <h3>{workout.user[0].name}</h3>
                <h3>{format(date, "PPPP 'at' p")}</h3> 
                <h3>{workout.workoutTitle}</h3> 
                <p>{workout.workoutNote}</p> 
                <p>{totalSets} Sets</p> 
                <p>{totalReps} Reps</p>
                <p>{workout.likeCount} Likes</p>
            </div> 
        )
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <WorkoutDetails /> 
                <button onClick={toggleVisibility}>View Exercises</button>
            </div> 
            <div style={showWhenVisible}>
                <WorkoutDetails /> 
                <button onClick={toggleVisibility}>Hide Exercises</button> 
                <ExerciseTable 
                    setWorkout={''}
                    workout={workout.workout} 
                    headers={['#', 'Exercise', 'Set', 'Rep', 'Weight', 'Notes']} 
                    actions={false}
                />
                
            </div>
        </div>
    )
}

export default Workout 