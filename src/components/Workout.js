import { useState, useEffect } from 'react'
import ExerciseTable from './ExerciseTable'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandFist, faChevronDown, faChevronUp, faDumbbell, faDeleteLeft, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import workoutService from '../services/workouts'
import userService from '../services/users'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import LikesListDisplay from './LikeListDisplay'

const Workout = ({ workout, user, setWorkouts, likes, setLikes }) => {
    const [visible, setVisible] = useState(false)
    const [liked, setLiked] = useState(likes.includes(workout.id) ? true : false)
    const [workoutLikeCount, setWorkoutLikeCount] = useState(workout.likeCount)
    const [likesVisible, setLikesVisible] = useState({ display: 'none' })
    const location = useLocation()

    const hideWhenVisible = { display: visible ? 'none' : 'block' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    let likeColor = {}
    liked
    ? likeColor = { color: 'var(--color-5)' }
    : likeColor = { color: 'black' }

    const workoutColor = { backgroundColor: `${workout.user[0].color}` }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const handleWorkoutDelete = async (event) => {
        event.preventDefault() 
        if (window.confirm(`Remove ${workout.workoutTitle}?`)) {
            await workoutService.deleteWorkout(workout.id)
            let updatedWorkoutList = []
            location.pathname === '/home'  
            ? updatedWorkoutList = await workoutService.getUserAndFollowingWorkouts(user.username)
            : updatedWorkoutList = await workoutService.getUserWorkouts(user.username)
            setWorkouts(updatedWorkoutList)
        }
    }

    const handleAddLike = async (event) => {
        event.preventDefault() 
        const response = await workoutService.addLike(workout.id)
        setLikes(response.likes)
        setWorkoutLikeCount(response.likeCount)
        setLiked(true)
    }

    const handleRemoveLike = async (event) => {
        event.preventDefault()
        await workoutService.removeLike(workout.id)
        const updatedLikes = likes.filter(id => id !== workout.id)
        setLikes(updatedLikes)
        setWorkoutLikeCount(workoutLikeCount - 1)
        setLiked(false) 
    }

    const handleLikesClick = () => { 
        setLikesVisible({ display: 'flex' })
    }   

    const handleLikesListClose = () => {
        setLikesVisible({ display: 'none' })
    }

    useEffect(() => {
        handleLikesListClose()
    }, [location])

    const WorkoutDetails = () => {

        const date = new Date(workout.workoutTime)

        return (
            <div>
                <div className='workout-text-container'> 
                    <div className='workout-name-date-container'> 
                        <NavLink className='profile-title' to={`/profile/${workout.user[0].username}`}>
                            <FontAwesomeIcon className='profile-picture' style={workoutColor} icon={faDumbbell} />
                            <h3>{workout.user[0].name}</h3>
                        </NavLink>
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
                <div className='fist-bump'>
                    <button style={likeColor} onClick={liked ? handleRemoveLike : handleAddLike}>
                        <FontAwesomeIcon className='left-fist-bump' icon={faHandFist} rotation={90} />
                        <FontAwesomeIcon icon={faHandFist} rotation={270} />
                    </button>
                    <p onClick={handleLikesClick}>{workoutLikeCount} {workoutLikeCount === 1 ? 'fist bump' : 'fist bumps'}</p>
                </div> 
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
            <div className='follow-list-display-container' style={likesVisible}> 
                <FontAwesomeIcon className='close-follow-list-button' icon={faXmarkCircle} onClick={handleLikesListClose} /> 
                <h3>Fist bumps</h3> 
                <LikesListDisplay likes={likes} id={workout.id} /> 
            </div> 
        </div>
    )
}

export default Workout 