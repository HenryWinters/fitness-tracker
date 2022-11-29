import { useEffect, useState } from 'react'
import Workout from '../components/Workout'
import workoutService from '../services/workouts'
import userService from '../services/users'
import InfiniteScroll from 'react-infinite-scroll-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'

const Home = ({ user, workouts, setWorkouts, following, setFollowing, setNotification }) => {

    const [workoutList, setWorkoutList] = useState([])
    const [endIndex, setEndIndex] = useState(10)

    useEffect(() => {
        const getWorkouts = async () => {
            const userAndFollowingWorkouts = await workoutService.getUserAndFollowingWorkouts(user.username)
            setWorkouts(userAndFollowingWorkouts)
        } 
        getWorkouts()
    }, [])

    useEffect(() => {
        setWorkoutList(workouts.slice(0, endIndex))
    }, [workouts])

    const fetchMoreData = () => {
        const incrementNum = 10
        setEndIndex(endIndex + incrementNum)
        setWorkoutList(workouts.slice(0, endIndex + incrementNum))
    }
    
    if (workoutList.length >= 1) {
        return (
            <div className='workouts-container-profile'>
                <InfiniteScroll 
                    dataLength={workoutList.length}
                    next={fetchMoreData}
                    hasMore={workoutList.length === workouts.length ? false : true}
                    loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4> }
                    endMessage={<h4 style={{ textAlign: 'center' }}>No more workouts</h4>}
                    style={{ overflow: 'hidden' }}
                >
                    {workoutList.map(workout => 
                        <Workout key={workout.id} workout={workout} user={user} setWorkouts={setWorkouts} following={following} setFollowing={setFollowing} setNotification={setNotification} /> 
                    )}
                </InfiniteScroll>
            </div> 
        )
    } else {
        return (
            <div className='no-workouts-to-display-profile'> 
                <p>No workouts yet! Click "+ Workout" to log your first lift</p>
                <FontAwesomeIcon icon={faDumbbell} /> 
            </div> 
        )
    }
}

export default Home 

/*
const Home = ({ user, workouts, setWorkouts, following, setFollowing }) => {

    useEffect(() => {
        const getWorkouts = async () => {
            const userAndFollowingWorkouts = await workoutService.getUserAndFollowingWorkouts(user.username)
            setWorkouts(userAndFollowingWorkouts)
        } 
        getWorkouts()
    }, [])

    if (workouts.length >= 1) {
        return (
            <div className='workouts-container-profile'>
                {workouts.map(workout => 
                    <Workout key={workout.id} workout={workout} user={user} setWorkouts={setWorkouts} following={following} setFollowing={setFollowing} /> 
                )}
            </div> 
        )
    } else {
        return (
            <div className='no-workouts-to-display-profile'> 
                <p>No workouts yet! Click "Add Workout" to start your first log.</p> 
            </div> 
        )
    }
}

export default Home 
*/