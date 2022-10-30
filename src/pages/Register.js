import { useState } from 'react'
import { SliderPicker } from 'react-color'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import userService from '../services/users'
import { useNavigate } from 'react-router-dom'



const Register = ({ setNotification }) => {
    const navigate = useNavigate()

    const date = new Date() 

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [registerDate, setRegisterDate] = useState(date)
    const [city, setCity] = useState('')
    const [bio, setBio] = useState('')
    const [color, setColor] = useState('')

    const handleNewAccountSubmission = async (event) => {
        event.preventDefault()
        if (password === confirmPassword) {
            try {
                const newUser = { username, password, name, registerDate, city, bio, color }
                await userService.addUser(newUser)
                setUsername('')
                setPassword('')
                setConfirmPassword('')
                setName('')
                setRegisterDate(date)
                setCity('')
                setBio('')
                setColor('')
                setNotification({ message: `Welcome, ${name}! Log in to start your logs`})
                setTimeout(() => {
                    setNotification({ message: null, type: null })
                }, 5000)
                navigate('/login')
            }
            catch (exception) {
                console.log(exception.response.data.error)
            } 
        } else {
            setNotification({ message: `Passwords don't match`})
                setTimeout(() => {
                    setNotification({ message: null, type: null })
                }, 5000)
        }
    }   

    return (
        <div> 
            <form onSubmit={handleNewAccountSubmission}> 
                <div> 
                    <label>Create username</label>
                    <input
                        type='text'
                        value={username}
                        name='New username'
                        onChange={({target}) => setUsername(target.value)}
                        placeholder='Input desired username'
                    />
                </div> 
                <div> 
                    <label>Create password</label>
                    <input
                        type='password'
                        value={password}
                        name='New password'
                        onChange={({target}) => setPassword(target.value)}
                        placeholder='Input desired password'
                    />
                </div> 
                <div> 
                    <label>Confirm password</label>
                    <input
                        type='password'
                        value={confirmPassword}
                        name='Confirm new password'
                        onChange={({target}) => setConfirmPassword(target.value)}
                        placeholder='Confirm new password'
                    />
                </div> 
                <div> 
                    <label>Name</label>
                    <input
                        type='text'
                        value={name}
                        name='New name'
                        onChange={({target}) => setName(target.value)}
                        placeholder='Input your name'
                    />
                </div> 
                <div> 
                    <label>City</label>
                    <input
                        type='text'
                        value={city}
                        name='City'
                        onChange={({target}) => setCity(target.value)}
                        placeholder='Input your city'
                    />
                </div> 
                <div> 
                    <label>Bio</label>
                    <input
                        type='text'
                        value={bio}
                        name='New bio'
                        onChange={({target}) => setBio(target.value)}
                        placeholder='Input your bio'
                    />
                </div> 
                <div> 
                    <label>Color</label>
                    <SliderPicker 
                        color={color}
                        onChange={(color) => {
                            setColor(color.hex)
                        }}
                    />
                </div> 
                <button type='submit'>
                    <p>Create Account</p>
                    <FontAwesomeIcon icon={faPlus} />
                </button> 
            </form> 
        </div> 
    )
}

export default Register 