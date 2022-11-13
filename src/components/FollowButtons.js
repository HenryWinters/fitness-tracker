import userService from '../services/users'

export const FollowButton = ({userToFollow, userToken, userUsername, setFollowingFunction, className}) => {

    const addFollow = async () => {
        await userService.addFollow(userToFollow, userToken)
        const updatedUser = await userService.getUser(userUsername)
        const updatedFollowing = updatedUser[0].following
        setFollowingFunction(updatedFollowing)
    }

    return (
        <button className={className} onClick={addFollow}>Follow</button>
    )
}

export const UnfollowButton = ({userToUnfollow, userToken, userUsername, setFollowingFunction, className}) => {

    const removeFollow = async () => {
        await userService.removeFollow(userToUnfollow, userToken)
        const updatedUser = await userService.getUser(userUsername)
        const updatedFollowing = updatedUser[0].following
        setFollowingFunction(updatedFollowing)
    }

    return (
        <button className={className} onClick={removeFollow}>Unfollow</button>
    )
}

