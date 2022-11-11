import userService from '../services/users'
import { useState, useEffect } from 'react'

const Users = ({user, setUser}) => {

    const [searchParameter, setSearchParameter] = useState('')
    const [usersList, setUsersList] = useState([])
    
    useEffect(() => {
        const getUsers = async () => {
            const users = await userService.getAllUsers()
            setUsersList(users)
        } 
        getUsers()
    }, [])

    useEffect(() => {
        window.localStorage.setItem(
            'loggedFitnessAppUser', JSON.stringify(user)
        )
    }, [user])

    const filteredUsers = usersList.filter(user => user.name.toLowerCase().includes(searchParameter.toLowerCase()))

    const User = ({ id, name, city}) => {

        const addFollow = async () => {
            await userService.addFollow(id, user.token)
            setUser({...user, following: user.following.concat(id)})
        }

        const removeFollow = async () => {
            console.log('NEED TO ADD THIS REMOVE FOLLOW FUNCTION')
        }

        return (
            <div className='user-on-users-list'>
                <p>{name}</p>
                <p>{city}</p>
                {user.following.includes(id) 
                ? <button className='unfollow-button' onClick={removeFollow}>Unfollow</button>
                : <button className='follow-button' onClick={addFollow}>Follow</button>
                }   
            </div> 
        )
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
                    placeholder='Type here to search users'
                />
            </div> 
            {searchParameter.length > 0
            ? filteredUsers.map(person => person.id !== user.id 
                ? <User key={person.id} id={person.id} name={person.name} city={person.city} /> 
                : null)
            : <div></div>}
        </div> 
    )
}

export default Users