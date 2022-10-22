import { useState } from 'react'
import ExerciseTable from './ExerciseTable'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandFist } from '@fortawesome/free-solid-svg-icons'

const Workout = ({workout}) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {
        display: visible ? 'none' : 'block',
    }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const totalSets = workout.workout.length
    const totalReps = workout.workout.reduce((accumulator, value) => {
        return accumulator + parseInt(value.reps)
    }, 0)
    const arrOfExerciseTitles = workout.workout.map((exerciseObj) => {
        return exerciseObj.exercise
    }).filter((item, index, arr) => {
        return arr.indexOf(item) === index
    })
    const totalExercises = arrOfExerciseTitles.length

    const WorkoutDetails = () => {

        const date = new Date(workout.workoutTime)

        return (
            <div>
                <h3>{workout.user[0].name}</h3>
                <p>{format(date, "PPPP 'at' p")}</p> 
                <h3>{workout.workoutTitle}</h3> 
                <p>{workout.workoutNote}</p> 
                <div className='exercise-stats'> 
                    <p>{totalExercises} Exercises</p>
                    <p>{totalSets} Sets</p> 
                    <p>{totalReps} Reps</p>
                </div> 
                <div className='fist-bump-count'> 
                    <button className='fist-bump'>
                        <div className='left-fist-bump'>
                            <FontAwesomeIcon icon={faHandFist} rotation={90} />
                        </div>
                        <div className='right-fist-bump'>
                            <FontAwesomeIcon icon={faHandFist} rotation={270} />
                        </div>  
                    </button> 
                    <p>{workout.likeCount}</p>
                </div> 
            </div> 
        )
    }

    return (
        <div className='workout-container'>
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
                    headers={['Exercise', 'Set', 'Reps', 'Weight', 'Notes']} 
                    actions={false}
                />
                
            </div>
        </div>
    )
}

export default Workout 