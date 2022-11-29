import userService from '../services/users'
import { useState, useEffect } from 'react'
import User from '../components/User'
import InfiniteScroll from 'react-infinite-scroll-component'

const Users = ({user, setUser, following, setFollowing}) => {

    const [searchParameter, setSearchParameter] = useState('')
    const [allUsers, setAllUsers] = useState([])
    const [filteredUsers, setFilteredUsersList] = useState([])
    const [usersList, setUsersList] = useState([])
    const [endIndex, setEndIndex] = useState(50)
    
    /* getting array of all users */ 
    useEffect(() => {
        const getUsers = async () => {
            const users = await userService.getAllUsers()
            setAllUsers(users)
        } 
        getUsers()
    }, [])

    /* getting array of who user is following */ 
    useEffect(() => {
        const getWhoUserFollowing = async () => {
            const userFollowing = await userService.getWhoUserIsFollowing(user.username)
            setFollowing(userFollowing)
        } 
        getWhoUserFollowing()
    }, [])

    /* filter all users every time search parameters change */ 
    useEffect(() => {
        setFilteredUsersList(searchParameter.length > 0 ? allUsers.filter(user => user.name.toLowerCase().includes(searchParameter.toLowerCase())) : [])
    }, [searchParameter])

    /* set initial list to display set number of users */ 
    useEffect(() => {
        setUsersList(filteredUsers.slice(0, endIndex))
    }, [filteredUsers])

    const fetchMoreData = () => {
        const incrementNum = 50
        setEndIndex(endIndex + incrementNum)
        setUsersList(filteredUsers.slice(0, endIndex + incrementNum))
    }

    return (
        <div className='users-container'>
            <div className='search-container'> 
                <label>Search users</label> 
                <input
                    type='text'
                    value={searchParameter}
                    name='Search parameter'
                    onChange={({ target }) => setSearchParameter(target.value)}
                    placeholder='Type to search users'
                />
            </div> 
            <InfiniteScroll 
                    dataLength={usersList.length}
                    next={fetchMoreData}
                    hasMore={usersList.length === filteredUsers.length ? false : true}
                    loader={usersList.length > 0 ? <h4 style={{ textAlign: 'center' }}>Loading...</h4> : <></>}
                    endMessage={usersList.length > 0 ? <h4 style={{ textAlign: 'center' }}>No more users fit search parameters</h4> : <></>}
                    style={{ overflow: 'hidden' }}
                >
                    {searchParameter.length > 0
                    ? usersList.map(person => person.id !== user.id 
                        ? <User key={person.id} id={person.id} username={person.username} name={person.name} city={person.city} user={user} following={following} setFollowing={setFollowing} /> 
                        : null)
                    : <div></div>}
            </InfiniteScroll>
        </div> 
    )
}

export default Users


/*const Users = ({user, setUser, following, setFollowing}) => {

    const [searchParameter, setSearchParameter] = useState('')
    const [usersList, setUsersList] = useState([])
    
    /* getting array of all users */ 
/*    useEffect(() => {
        const getUsers = async () => {
            const users = await userService.getAllUsers()
            setUsersList(users)
        } 
        getUsers()
    }, [])

    /* getting array of who user is following */ 
/*    useEffect(() => {
        const getWhoUserFollowing = async () => {
            const userFollowing = await userService.getWhoUserIsFollowing(user.username)
            setFollowing(userFollowing)
        } 
        getWhoUserFollowing()
    }, [])

    const filteredUsers = usersList.filter(user => user.name.toLowerCase().includes(searchParameter.toLowerCase()))

    return (
        <div className='users-container'>
            <div className='search-container'> 
                <label>Search users</label> 
                <input
                    type='text'
                    value={searchParameter}
                    name='Search parameter'
                    onChange={({ target }) => setSearchParameter(target.value)}
                    placeholder='Type to search users'
                />
            </div> 
            {searchParameter.length > 0
            ? filteredUsers.map(person => person.id !== user.id 
                ? <User key={person.id} id={person.id} username={person.username} name={person.name} city={person.city} user={user} following={following} setFollowing={setFollowing} /> 
                : null)
            : <div></div>}
        </div> 
    )
}

export default Users*/