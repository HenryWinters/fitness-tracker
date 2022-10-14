import { useState } from 'react'

const WorkoutForm = () => {

    const [exercise, setExercise] = useState('')
    const [set, setSet] = useState('')
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const [workout, setWorkout] = useState([])
    const [setID, setSetID] = useState(0)

    const addExerciseToWorkout = (event) => {
        event.preventDefault()
        const newExercise = { setID, exercise, set, reps, weight }
        setWorkout([...workout, newExercise])
        setSetID(setID + 1)
        setExercise('')
        setReps('')
        setWeight('')
    }

    const removeExerciseFromWorkout = (ID) => {
        const workoutListWithDeletion = workout.filter(exercise => exercise.setID !== ID)
        console.log(workoutListWithDeletion)
        setWorkout(workoutListWithDeletion)
    }

    return (
        <div> 
            <div className='workout-form'>
                <form onSubmit={addExerciseToWorkout}>
                    <div>
                        Exercise:
                        <input 
                            type='text'
                            value={exercise}
                            name='Exercise'
                            onChange={({ target }) => setExercise(target.value)}
                            placeholder='title of exercise'
                        />
                    </div>
                    <div>
                        Set: 
                        <input 
                            type='text'
                            value={set}
                            name='Sets'
                            onChange={({ target }) => setSet(target.value)}
                            placeholder='set number'
                        />
                    </div>
                    <div>
                        Reps: 
                        <input 
                            type='text'
                            value={reps}
                            name='Reps'
                            onChange={({ target }) => setReps(target.value)}
                            placeholder='number of reps'
                        />
                    </div>
                    <div>
                        Weight (lbs): 
                        <input 
                            type='text'
                            value={weight}
                            name='Weight'
                            onChange={({ target }) => setWeight(target.value)}
                            placeholder='Weight (lbs)'
                        />
                    </div>
                    <button type='submit'>Add to workout</button> 
                </form> 
            </div>
            <div className='workout-table-container'>
                <div className='workout-table'>  
                    <div className='workout-table-head'>
                        <h3>#</h3>
                        <h3>Exercise</h3>
                        <h3>Set</h3>
                        <h3>Reps</h3> 
                        <h3>Weight</h3> 
                        <h3>Actions</h3>
                    </div> 
                    <div className='workout-table-body'> 
                        {workout.map((val, key) => {
                            return (
                                <div className='exercise-entry' key={key}> 
                                    <p>{key + 1}</p> 
                                    <p>{val.exercise}</p>
                                    <p>{val.set}</p>
                                    <p>{val.reps}</p>
                                    <p>{val.weight}</p> 
                                    <div className='workout-actions'>
                                        <button onClick={() => removeExerciseFromWorkout(val.setID)}>X</button>  
                                    </div> 
                                </div> 
                            )
                        })}  
                    </div>  
                </div> 
            </div> 
            <div> 
                <button type='submit'>Save</button> 
            </div> 
        </div> 
    )
}

export default WorkoutForm