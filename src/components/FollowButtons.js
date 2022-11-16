import userService from '../services/users'

export const FollowButton = ({userToFollow, userToken, userUsername, setFollowing, className}) => {

    const addFollow = async () => {
        await userService.addFollow(userToFollow, userToken)
        const updatedUser = await userService.getUser(userUsername)
        const updatedFollowing = updatedUser[0].following
        setFollowing(updatedFollowing)
    }

    return (
        <button className={className} onClick={addFollow}>Follow</button>
    )
}

export const UnfollowButton = ({userToUnfollow, userToken, userUsername, setFollowing, className}) => {

    const removeFollow = async () => {
        await userService.removeFollow(userToUnfollow, userToken)
        const updatedUser = await userService.getUser(userUsername)
        const updatedFollowing = updatedUser[0].following
        setFollowing(updatedFollowing)
    }

    return (
        <button className={className} onClick={removeFollow}>Unfollow</button>
    )
}

