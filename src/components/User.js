import { FollowButton, UnfollowButton }  from './FollowButtons'
import { NavLink } from 'react-router-dom'

const User = ({ id, username, name, city, user, following, setFollowing}) => {

    return (
        <div className='user-on-users-list'>
            <NavLink className='users-list-link-to-profile' to={`/profile/${username}`} >
                <p>{name}</p>
            </NavLink> 
            <p>{city}</p>
            {id === user.id 
            ? <></>
            : following.includes(id) 
            ? <UnfollowButton className='unfollow-button' userToUnfollow={id} userToken={user.token} userUsername={user.username} setFollowing={setFollowing} />
            : <FollowButton className='follow-button' userToFollow={id} userToken={user.token} userUsername={user.username} setFollowing={setFollowing} />
            }   
        </div> 
    )
}

export default User