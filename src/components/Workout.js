import { useState } from 'react'
import ExerciseTable from './ExerciseTable'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandFist, faChevronDown, faChevronUp, faDumbbell, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import workoutService from '../services/workouts'

const Workout = ({workout, user, setWorkouts}) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {
        display: visible ? 'none' : 'block',
    }
    const showWhenVisible = { 
        display: visible ? '' : 'none' 
    }

    const workoutColor = { 
        backgroundColor: `${workout.user[0].color}` 
    }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const handleWorkoutDelete = async (event) => {
        event.preventDefault() 
        if (window.confirm(`Remove ${workout.workoutTitle}?`)) {
            await workoutService.deleteWorkout(workout.id)
            const updatedUserWorkoutList = await workoutService.getUserWorkouts(user.id)
            setWorkouts(updatedUserWorkoutList)
        }
    }


    const WorkoutDetails = () => {

        const date = new Date(workout.workoutTime)

        return (
            <div>
                <div className='workout-text-container'> 
                    <div className='workout-name-date-container'> 
                        <div className='profile-title'> 
                            <FontAwesomeIcon className='profile-picture' style={workoutColor} icon={faDumbbell} />
                            <h3>{workout.user[0].name}</h3>
                        </div> 
                        <p>{format(date, "PPPP 'at' p")}</p> 
                    </div> 
                    <h3>{workout.workoutTitle}</h3> 
                    <p>{workout.workoutNote}</p> 
                </div> 
                <div className='workout-exercise-titles-container'> 
                    <div className='workout-exercise-titles'> 
                        {workout.exerciseTitles.map((exerciseTitle, i) => {
                            return (
                                <div key={i} className='new-title'> 
                                    <p>{exerciseTitle}</p> 
                                    {workout.exerciseTitles[i+1] ? <div className='vertical-line'></div> : <div></div>}
                                </div> 
                            )
                        })}
                    </div> 
                </div> 
                <div className='exercise-stats'> 
                    <div className='exercise-stat'> 
                        <p className='exercise-stat-number'>{workout.totalExercises}</p>
                        <p>Exercises</p> 
                    </div> 
                    <div className='exercise-stat'> 
                        <p className='exercise-stat-number'>{workout.totalSets}</p> 
                        <p>Sets</p> 
                    </div> 
                    <div className='exercise-stat'> 
                        <p className='exercise-stat-number'>{workout.totalReps}</p>
                        <p>Reps</p> 
                    </div> 
                </div> 
                <button className='fist-bump'>
                    <FontAwesomeIcon className='left-fist-bump' icon={faHandFist} rotation={90} />
                    <FontAwesomeIcon icon={faHandFist} rotation={270} />
                    <p>{workout.likeCount}</p>
                </button> 
                {user.id === workout.user[0].id ? 
                <button className='delete-workout-button' onClick={handleWorkoutDelete}>
                    <FontAwesomeIcon icon={faDeleteLeft} />
                </button> : null}
            </div> 
        )
    }

    const ViewAndHideButton = ({ buttonText, icon }) => {
        return (
            <div className='view-button-container'>  
                    <button className='view-button' onClick={toggleVisibility}>
                        <p>{buttonText}</p> 
                        <FontAwesomeIcon icon={icon} />
                    </button> 
            </div> 
        )
    }

    return (
        <div className='workout-container'>
            <div style={hideWhenVisible}>
                <WorkoutDetails />
                <ViewAndHideButton buttonText='View Exercises' icon={faChevronDown} />
            </div> 
            <div style={showWhenVisible}>
                <WorkoutDetails />
                <ViewAndHideButton buttonText='Hide Exercises' icon={faChevronUp} />
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