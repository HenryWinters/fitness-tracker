import { useState } from 'react'
import { SliderPicker } from 'react-color'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import userService from '../services/users'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

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
        if (checkPasswordMatch()) {
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
                navigate('/')
            }
            catch (exception) {
                setNotification({ message: exception.response.data.error, type: 'error'})
                setTimeout(() => {
                    setNotification({ message: null, type: null })
                }, 5000)
            } 
        } else {
            setNotification({ message: `Passwords don't match`})
                setTimeout(() => {
                    setNotification({ message: null, type: null })
                }, 5000)
        }
    }  

    const checkPasswordMatch = () => {
        if (confirmPassword === password) {
            return true
        } else {
            return false
        }
    }

    const checkPasswordValidity = () => {
        const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        return passwordRegex.test(password)
    }

    return (
        <div className='register-form-container'> 
            <NavLink id='login-link' to='/'>
                <FontAwesomeIcon icon={faChevronLeft} />
                <p>Back to login page</p> 
            </NavLink>
            <h1>Create your account</h1>
            <form onSubmit={handleNewAccountSubmission}> 
                <div className='register-input-container'> 
                    <label>Create username</label>
                    <input
                        type='text'
                        value={username}
                        name='New username'
                        onChange={({target}) => setUsername(target.value)}
                        placeholder='Input desired username'
                    />
                </div> 
                <div className='register-input-container'> 
                    <label>Create password</label>
                    <input
                        type='password'
                        value={password}
                        name='New password'
                        style={checkPasswordValidity() && password.length > 0 ? {borderColor: 'green'} : password.length > 0 ? {borderColor: 'red'} : {borderColor: ''}}
                        onChange={({target}) => setPassword(target.value)}
                        placeholder='Input desired password'
                    />
                </div> 
                <div className='register-input-container'> 
                    <label>Confirm password</label>
                    <input
                        type='password'
                        value={confirmPassword}
                        name='Confirm your password'
                        style={checkPasswordMatch() && confirmPassword.length > 0 ? {borderColor: 'green'} : confirmPassword.length > 0 ? {borderColor: 'red'} : {borderColor: ''} }
                        onChange={({target}) => setConfirmPassword(target.value)}
                        placeholder='Confirm your password'
                    />
                </div> 
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
                        <p>Create Account</p>
                        <FontAwesomeIcon icon={faPlus} />
                    </div> 
                </button> 
            </form> 
        </div> 
    )
}

export default Register 