import { useState } from 'react'

const Register = ({ setUser }) => {
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newName, setNewName] = useState('')
    const [newRegisterDate, setNewRegisterDate] = useState('')
    const [newCity, setNewCity] = useState('')
    const [newBio, setNewBio] = useState('')
    const [newColor, setNewColor] = useState('')

    const RegisterInput = ({labelContent, type, value, name, setFunction, placeholder }) => {
        return (
            <div> 
                <label>{labelContent}</label>
                <input
                    type={type}
                    value={value}
                    name={name}
                    onChange={({target}) => setFunction(target.value)}
                    placeholder={placeholder}
                />
            </div> 
        )
    }

    return (
        <div> 
            <form> 
                <RegisterInput 
                    labelContent='Create username:'
                    type='text'
                    value={newUsername}
                    name='Create username'
                    onChange={setNewUsername}
                    placeholder='Input desired username'
                />
                <div> 
                    <label>Create username:</label> 
                    <input 
                        type='text'
                        value={newUsername}
                        name='Create username'
                        onChange={({ target }) => setNewUsername(target.value)}
                        placeholder='Input desired username'
                    /> 
                </div> 
                
            </form> 
        </div> 
    )
}

export default Register 