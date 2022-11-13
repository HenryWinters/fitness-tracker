import userService from '../services/users'
import { useState, useEffect } from 'react'
import User from '../components/User'

const Users = ({user, setUser, following, setFollowing}) => {

    const [searchParameter, setSearchParameter] = useState('')
    const [usersList, setUsersList] = useState([])
    
    /* getting array of all users */ 
    useEffect(() => {
        const getUsers = async () => {
            const users = await userService.getAllUsers()
            setUsersList(users)
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
                    placeholder='Type here to search users'
                />
            </div> 
            {searchParameter.length > 0
            ? filteredUsers.map(person => person.id !== user.id 
                ? <User key={person.id} id={person.id} name={person.name} city={person.city} user={user} following={following} setFollowing={setFollowing} /> 
                : null)
            : <div></div>}
        </div> 
    )
}

export default Users