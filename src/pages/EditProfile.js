import { useEffect, useState } from 'react'
import userService from '../services/users'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { SliderPicker } from 'react-color'
import { useNavigate } from 'react-router-dom'

const EditProfile = ({ user, setNotification }) => {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [bio, setBio] = useState('')
    const [color, setColor] = useState('')

    /*get user profile info based on logged in user username*/
    useEffect(() => {
        const getUserInfo = async () => {
            const userObject = await userService.getUser(user.username)
            const userInfo = userObject[0]
            setName(userInfo.name)
            setCity(userInfo.city)
            setBio(userInfo.bio)
            setColor(userInfo.color)
        } 
        getUserInfo()
    }, [])

    const handleAccountEdit = async (event) => {
        event.preventDefault()
        const editedUser = { name, city, bio, color }
    
        try {
            const editedUser = { name, city, bio, color }
            await userService.editUser(user.id, editedUser)
            setName('')
            setCity('')
            setBio('')
            setColor('')
            setNotification({ message: `Your account has been edited`, type: 'success' })
            setTimeout(() => {
                setNotification({ message: null, type: null })
            }, 10000)
            navigate(`/profile/${user.username}`)
        }
        catch (exception) {
            setNotification({ message: exception.response.data.error, type: 'error' })
            setTimeout(() => {
                setNotification({ message: null, type: null })
            }, 10000)
        }
    } 
      

    return (
        <div className='register-form-container'> 
            <NavLink id='login-link' to={`/profile/${user.username}`}>
                <FontAwesomeIcon icon={faChevronLeft} />
                <p>Back to profile page</p> 
            </NavLink>
            <h1>Edit profile</h1>
            <form onSubmit={handleAccountEdit}> 
                <div className='register-input-container'> 
                    <label>Name</label>
                    <input
                        type='text'
                        value={name}
                        name='New name'
                        onChange={({target}) => setName(target.value)}
                        placeholder='Input your name'
                    />
                </div> 
                <div className='register-input-container'> 
                    <label>City</label>
                    <input
                        type='text'
                        value={city}
                        name='City'
                        onChange={({target}) => setCity(target.value)}
                        placeholder='Input your city'
                    />
                </div> 
                <div className='register-input-container'> 
                    <label>Bio</label>
                    <input
                        type='text'
                        value={bio}
                        name='New bio'
                        onChange={({target}) => setBio(target.value)}
                        placeholder='Input your bio'
                    />
                </div> 
                <div id='color-selector-container'> 
                    <label>Select color</label>
                    <SliderPicker 
                        color={color}
                        onChange={(color) => {
                            setColor(color.hex)
                        }}
                    />
                </div> 
                <button id='register-submit-button' type='submit'>
                    <div id='register-submit-button-content'> 
                        <p>Update Account</p>
                        <FontAwesomeIcon icon={faPlus} />
                    </div> 
                </button> 
            </form> 
        </div>
    )
}

export default EditProfile