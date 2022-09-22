import { useState } from 'react'
import loginService from '../services/login'

const Login = ({ setUser, setNotification }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault() 
        try {
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem(
                'loggedFitnessAppUser', JSON.stringify(user)
            )

            setUser(user)
            setUsername('')
            setPassword('')
            setNotification({ message: `${username} is now logged in` })
            setTimeout(() => {
                setNotification({ message: null, type: null })
            }, 5000)
        } catch (exception) {
            setNotification({ message: exception.response.data.error, type: 'error' })
            setTimeout(() => {
                setNotification({ message: null, type: null })
            }, 5000)
        }
    }


    return (
        <div>
            <form onSubmit={handleLogin}> 
                <div> 
                    <p>Username</p>
                    <input
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
                        type='password'
                        name='Password'
                        id='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    /> 
                </div> 
                <button type='submit' id='login-button'>Login</button>
            </form> 
        </div> 
    )
}

export default Login 