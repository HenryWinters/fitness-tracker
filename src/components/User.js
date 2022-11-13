import { FollowButton, UnfollowButton }  from './FollowButtons'

const User = ({ id, name, city, user, following, setFollowing}) => {

    return (
        <div className='user-on-users-list'>
            <p>{name}</p>
            <p>{city}</p>
            {following.includes(id) 
            ? <UnfollowButton className='unfollow-button' userToUnfollow={id} userToken={user.token} userUsername={user.username} setFollowingFunction={setFollowing} />
            : <FollowButton className='follow-button' userToFollow={id} userToken={user.token} userUsername={user.username} setFollowingFunction={setFollowing} />
            }   
        </div> 
    )
}

export default User