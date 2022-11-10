import { useEffect, useState } from 'react'
import userService from '../services/users'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'

const Profile = ({ user }) => {
    const [userInformation, setUserInformation] = useState([])
    
    const params = useParams()
    const id = params.id

    useEffect(() => {
        const getUser = async () => {
            const userObject = await userService.getUser(id)
            setUserInformation(userObject[0])
        } 
        getUser()
    }, [id])

    if (userInformation.length !== 0) {
        const personalProfileCheck = () => user.id === params.id 

        const date = new Date(userInformation.registerDate)

        const userIconColor = { 
            backgroundColor: `${userInformation.color}` 
        }

        return (
            <div>
                <div className='profile-heading-container'>
                    <FontAwesomeIcon className='userIcon' icon={faUser} style={userIconColor} />
                    <h1>{userInformation.name}</h1>
                    <p>Member since {format(date, "PPPP")}</p>
                </div> 
            </div> 
        )
    }
}

export default Profile

/*<p>Member since {format(date, "PPPP")}</p> */