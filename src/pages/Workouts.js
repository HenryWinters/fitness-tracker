import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Workout from '../components/Workout'
import workoutService from '../services/workouts'
import InfiniteScroll from 'react-infinite-scroll-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'

const Workouts = ({ user, workouts, setWorkouts, following, setFollowing, setNotification }) => {  

    const [workoutList, setWorkoutList] = useState([])
    const [endIndex, setEndIndex] = useState(10)

    const params = useParams()
    const username = params.username
    
    useEffect(() => {
        const getWorkouts = async () => {
            const userWorkouts = await workoutService.getUserWorkouts(username)
            setWorkouts(userWorkouts)
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

    if (workouts.length >= 1) {
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
                <p>No workouts yet!</p>
                <p>Click "+ Workout" to log your first lift or "Users" to start following other users</p>
                <FontAwesomeIcon icon={faDumbbell} className='no-workouts-icon' /> 
            </div> 
        )
    }
}

export default Workouts