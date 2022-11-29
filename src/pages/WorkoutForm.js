import { useState, useEffect, useRef } from 'react'
import workoutService from '../services/workouts'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import ExerciseTable from '../components/ExerciseTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'

const WorkoutForm = ({ setNotification }) => {
    const navigate = useNavigate()
    const ref = useRef(null)
    
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

    /* checking if there is a workout in progress stored in local storage */ 
    const initialWorkoutData = localStorage.getItem('workoutInProgress')
        ? JSON.parse(localStorage.getItem('workoutInProgress'))
        : []

    const [exercise, setExercise] = useState('')
    const [set, setSet] = useState(0)
    const [reps, setReps] = useState(0)
    const [weight, setWeight] = useState(0)
    const [exerciseNote, setExerciseNote] = useState('')
    const [workout, setWorkout] = useState(initialWorkoutData) 
    const [setID, setSetID] = useState(0)
    const [workoutTitle, setWorkoutTitle] = useState(defaultWorkoutTitle)
    const [workoutNote, setWorkoutNote] = useState('')
    const [workoutTime, setWorkoutTime] = useState(date)

    useEffect(() => {
        localStorage.setItem('workoutInProgress', JSON.stringify(workout))
    }, [workout])

    const addExerciseToWorkout = (event) => {
        event.preventDefault()
        const newExercise = { setID, exercise, set, reps, weight, exerciseNote }
        setWorkout([...workout, newExercise])
        setSetID(setID + 1)
        setExercise('')
        setSet(0)
        setReps(0)
        setWeight(0)
        setExerciseNote('')
        ref.current.focus();
    }

    const clearExercisesFromWorkout = () => {
        if (window.confirm('Clear all exercise?')) {
            setWorkoutNote('')
            setWorkout([])
        }
    }

    const saveExercise = async (event) => {
        event.preventDefault()
        try {
            const totalSets = workout.length
            const totalReps = workout.reduce((accumulator, value) => {
                    return accumulator + parseInt(value.reps)
                }, 0)
            const exerciseTitles = workout.map((exerciseObj) => {
                return exerciseObj.exercise
            }).filter((item, index, arr) => {
                return arr.indexOf(item) === index
            })
            const totalExercises = exerciseTitles.length

            const workoutToSave = { workoutTitle, workoutNote, workoutTime, workout, totalSets, totalReps, totalExercises, exerciseTitles }
            await workoutService.addWorkout(workoutToSave) 
            setWorkoutTitle(defaultWorkoutTitle)
            setWorkoutNote('')
            setWorkoutTime(date)
            setWorkout([])
            setNotification({ message: `Saved ${workoutTitle}`, type: 'success' })
            setTimeout(() => {
                setNotification({ message: null, type: null })
            }, 5000)
        } catch (exception) {
            console.log('error')
        }
    }

    const textAreaAdjust = (event) => {
        event.target.style.height = 'inherit'
        event.target.style.height = (event.target.scrollHeight)+'px'
    }

    return (
        <div className='workout-form-and-table-container'>
            <div className='workout-form-button-container'>
                <div id='workout-clear-button'>  
                    <button className='workout-form-button' onClick={() => clearExercisesFromWorkout()}>
                        <p>Clear</p>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div> 
                <div id='workout-save-button'> 
                    <button className='workout-form-button' type='submit' onClick={saveExercise}>
                        <p>Save</p>
                        <FontAwesomeIcon icon={faCloudArrowUp} />
                    </button> 
                </div> 
            </div> 
            <div className='workout-information'>
                <h1>Create Your Workout</h1> 
                <div className='workout-title'>
                    <div className='workout-input-container'>
                        <label>Title:</label> 
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
                    <div className='workout-input-container'>
                        <label>Notes:</label>  
                        <textarea
                            value={workoutNote}
                            name='Workout Notes'
                            onKeyDown={textAreaAdjust}
                            style={{'overflow':'hidden'}}
                            onChange={({ target }) => setWorkoutNote(target.value)}
                            placeholder='How did it go? Write your notes here'
                        />
                    </div> 
                </div>
            </div> 
            <div>  
                <div>
                    <form className='workout-form' onSubmit={addExerciseToWorkout}>
                        <h1>Add Exercises</h1>
                        <div className='workout-input-container'>
                            <label>Exercise:</label>
                            <input 
                                autoFocus
                                ref={ref}
                                type='text'
                                value={exercise}
                                name='Exercise'
                                onChange={({ target }) => setExercise(target.value)}
                                placeholder='title of exercise'
                            />
                        </div>
                        <div className='workout-input-container'>
                            <label>Set:</label>  
                            <input 
                                className='exercise-number-input'
                                type='number'
                                value={set || ''}
                                name='Sets'
                                onChange={({ target }) => setSet(parseInt(target.value))}
                                placeholder='set number'
                            />
                        </div>
                        <div className='workout-input-container'>
                            <label>Reps:</label>  
                            <input 
                                className='exercise-number-input'
                                type='number'
                                value={reps || ''}
                                name='Reps'
                                onChange={({ target }) => setReps(parseInt(target.value))}
                                placeholder='number of reps'
                            />
                        </div>
                        <div className='workout-input-container'>
                            <label>Weight (lbs):</label> 
                            <input 
                                className='exercise-number-input'
                                type='number'
                                value={weight || ''}
                                name='Weight'
                                onChange={({ target }) => setWeight(parseInt(target.value))}
                                placeholder='Weight (lbs)'
                            />
                        </div>
                        <div className='workout-input-container'>
                            <label>Notes:</label> 
                            <input 
                                type='text'
                                value={exerciseNote}
                                name='Exercise Note'
                                onChange={({ target }) => setExerciseNote(target.value)}
                                placeholder='Notes about exercise'
                            />
                        </div>
                        <button className='workout-form-button' type='submit'>
                            <p>Add to workout</p>
                            <FontAwesomeIcon icon={faPlus} />
                        </button> 
                    </form> 
                </div>
            </div> 
            <ExerciseTable
                className='exercise-table-workout-form' 
                setWorkout={setWorkout}
                workout={workout} 
                headers={['Exercise', 'Set', 'Reps', 'Weight', 'Notes']} 
                actions={true}
            />
        </div> 
    )
}

export default WorkoutForm