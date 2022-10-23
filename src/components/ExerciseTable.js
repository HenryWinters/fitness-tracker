import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'

const ExerciseTable = ({ setWorkout, workout, headers, actions }) => {

    const removeExerciseFromWorkout = (ID) => {
        const workoutListWithDeletion = workout.filter(exercise => exercise.setID !== ID)
        setWorkout(workoutListWithDeletion)
    }

    return (
        <div className='workout-table-container'>
                <div className='workout-table'>  
                    <div className='workout-table-head'>
                        {headers.map((header) => {
                            return (
                                <h3 key={header}>{header}</h3> 
                            )
                        })}
                    </div> 
                    <div className='workout-table-body'> 
                        {workout.map((val, key) => {
                            return (
                                <div className='exercise-entry' key={key}>
                                    {!(workout[key-1]) ? <p>{val.exercise}</p> 
                                    : (val.exercise.toLowerCase() !== workout[key-1].exercise.toLowerCase()) ? <p>{val.exercise}</p>
                                    : <p></p>}
                                    <p>{val.set}</p>
                                    <p>{val.reps}</p>
                                    <p>{val.weight}</p> 
                                    <p>{val.exerciseNote}</p>
                                    {actions ? (
                                        <div className='workout-actions'>
                                            <button onClick={() => removeExerciseFromWorkout(val.setID)}>
                                                <FontAwesomeIcon icon={faDeleteLeft} />
                                            </button>  
                                        </div> 
                                    ) : ( null )}
                                </div> 
                            )
                        })} 
                    </div>  
                </div>
        </div> 
    )

}

export default ExerciseTable