import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginService from '../services/login'
import userService from '../services/users'
import workoutService from '../services/workouts'

const Login = ({ setUser, setNotification }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault() 
        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem(
                'loggedFitnessAppUser', JSON.stringify(user)
            )
            workoutService.setToken(user.token) 
            userService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            setNotification({ message: `${username} is now logged in` })
            setTimeout(() => {
                setNotification({ message: null, type: null })
            }, 5000)
            navigate('/home')
        } catch (exception) {
            setNotification({ message: exception.response.data.error, type: 'error' })
            setTimeout(() => {
                setNotification({ message: null, type: null })
            }, 5000)
        }
    }

    const handleRegisterClick = () => {
        navigate('/register')
    }

    return (
        <div className='login-container'>
            <form onSubmit={handleLogin}> 
                <div> 
                    <p>Username</p>
                    <input
                        className='login-input'
                        type='text'
                        name='Username'
                        id='username'
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>  
                    <p>Password</p>
                    <input 
                        className='login-input'
                        type='password'
                        name='Password'
                        id='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    /> 
                </div> 
                <button type='submit' id='login-button'>Login</button>
            </form> 
            <button className='register-button' onClick={handleRegisterClick}>New? Click here to register</button> 
        </div> 
    )
}

export default Login 