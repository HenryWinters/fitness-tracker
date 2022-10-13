import { useState } from 'react'

const WorkoutForm = () => {

    const [exercise, setExercise] = useState('')
    const [set, setSet] = useState('')
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const [workout, setWorkout] = useState([])
    const [numberOfSets, setNumberOfSets] = useState(1)

    const addExerciseToWorkout = (event) => {
        event.preventDefault()
        setNumberOfSets(numberOfSets + 1)
        const newExercise = { numberOfSets, exercise, set, reps, weight }
        setWorkout([...workout, newExercise])
        setExercise('')
        setReps('')
        setWeight('')
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
            <div className='workout-table'>
                <table>
                    <thead> 
                        <tr> 
                            <th>#</th>
                            <th>Exercise</th>
                            <th>Set</th>
                            <th>Reps</th> 
                            <th>Weight</th> 
                        </tr> 
                    </thead>
                    {workout.map((val, key) => {
                        return (
                            <tbody key={key}> 
                                <tr>
                                    <td>{val.numberOfSets}</td> 
                                    <td>{val.exercise}</td>
                                    <td>{val.set}</td>
                                    <td>{val.reps}</td>
                                    <td>{val.weight}</td>   
                                </tr>
                            </tbody> 
                        )
                    })}  
                </table> 
            </div> 
            <div className='workout-table-container'>
                <div className='workout-table-2'>  
                    <div className='workout-table-head'>
                        <h3>#</h3>
                        <h3>Exercise</h3>
                        <h3>Set</h3>
                        <h3>Reps</h3> 
                        <h3>Weight</h3> 
                    </div> 
                    <div className='workout-table-body'> 
                        {workout.map((val, key) => {
                            return (
                                <div className='exercise-entry' key={key}> 
                                    <p>{val.numberOfSets}</p> 
                                    <p>{val.exercise}</p>
                                    <p>{val.set}</p>
                                    <p>{val.reps}</p>
                                    <p>{val.weight}</p>   
                                </div> 
                            )
                        })}  
                    </div>  
                </div> 
            </div> 
        </div> 
    )
}

export default WorkoutForm