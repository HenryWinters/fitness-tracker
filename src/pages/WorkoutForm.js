import { useState } from 'react'
import workoutService from '../services/workouts'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import ExerciseTable from '../components/ExerciseTable'

const WorkoutForm = () => {
    const navigate = useNavigate()
    
    const date = new Date()

    const timeOfDay = (date) => {
        let result = ''
        let currentHour = date.getHours()
        if (currentHour < 12) {
            result = 'Morning'
        } else if (currentHour < 18) {
            result = 'Afternoon'
        } else {
            result = 'Evening'
        }
        return result
    }  
    
    const defaultWorkoutTitle = timeOfDay(date) + ' Workout'

    const [exercise, setExercise] = useState('')
    const [set, setSet] = useState('')
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const [exerciseNote, setExerciseNote] = useState('')
    const [workout, setWorkout] = useState([])
    const [setID, setSetID] = useState(0)
    const [workoutTitle, setWorkoutTitle] = useState(defaultWorkoutTitle)
    const [workoutNote, setWorkoutNote] = useState('')
    const [workoutTime, setWorkoutTime] = useState(date)

    const addExerciseToWorkout = (event) => {
        event.preventDefault()
        const newExercise = { setID, exercise, set, reps, weight, exerciseNote }
        setWorkout([...workout, newExercise])
        setSetID(setID + 1)
        setExercise('')
        setReps('')
        setWeight('')
        setSet('')
        setExerciseNote('')
    }

    const clearExercisesFromWorkout = () => {
        if (window.confirm('Clear all exercise?')) {
            setWorkout([])
        }
    }

    const saveExercise = async (event) => {
        event.preventDefault()
        try {
            const workoutToSave = { workoutTitle, workoutNote, workoutTime, workout }
            await workoutService.addWorkout(workoutToSave) 
            setWorkoutTitle(defaultWorkoutTitle)
            setWorkoutNote('')
            setWorkoutTime('')
            setWorkout([])
            navigate('/home')
        } catch (exception) {
            console.log('error')
        }
    }

    return (
        <div>
            <div className='workout-information'>
                <h1>Workout Information</h1> 
                <div className='workout-title'>
                    <div>
                        Title: 
                        <input
                            type='text'
                            value={workoutTitle}
                            name='Title'
                            onChange={({ target }) => setWorkoutTitle(target.value)}
                            placeholder='Title of workout'
                        />
                    </div>
                </div> 
                <div className='workout-notes'>
                    <div>
                        Notes: 
                        <input
                            type='textarea'
                            value={workoutNote}
                            name='Workout Notes'
                            onChange={({ target }) => setWorkoutNote(target.value)}
                            placeholder='How did it go? Write your notes here'
                        />
                    </div> 
                </div>
            </div> 
            <div> 
                <h1>Add Exercises</h1> 
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
                        <div>
                            Notes: 
                            <input 
                                type='text'
                                value={exerciseNote}
                                name='Exercise Note'
                                onChange={({ target }) => setExerciseNote(target.value)}
                                placeholder='Notes about exercise'
                            />
                        </div>
                        <button type='submit'>Add to workout</button> 
                    </form> 
                </div>
            </div> 
            <ExerciseTable 
                setWorkout={setWorkout}
                workout={workout} 
                headers={['#', 'Exercise', 'Set', 'Rep', 'Weight', 'Notes', 'Actions']} 
                actions={true}
            />
            <div> 
                <button onClick={() => clearExercisesFromWorkout()}>Clear</button>
                <button type='submit' onClick={saveExercise}>Save</button> 
            </div> 
        </div> 
    )
}

export default WorkoutForm

/*<div className='workout-table-container'>
                <div className='workout-table'>  
                    <div className='workout-table-head'>
                        <h3>#</h3>
                        <h3>Exercise</h3>
                        <h3>Set</h3>
                        <h3>Reps</h3> 
                        <h3>Weight</h3> 
                        <h3>Notes</h3>
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
                                    <p>{val.exerciseNote}</p>
                                    <div className='workout-actions'>
                                        <button onClick={() => removeExerciseFromWorkout(val.setID)}>X</button>  
                                    </div> 
                                </div> 
                            )
                        })}  
                    </div>  
                </div> 
            </div>*/