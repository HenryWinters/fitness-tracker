const TopNav = ({user, setNotification}) => {

    const handleLogOut = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedFitnessAppUser')
        window.location.reload(false)
        setNotification({ message: `${user.name} logged out`, type: 'error' })
        setTimeout(() => {
          setNotification({ message: null, type: null })
        }, 5000)
    }

    return (
        <div>
            <p>Add Workout</p>
            <h1>Lift Log</h1>
            <button onClick={handleLogOut}>Log Out</button> 
        </div> 
    )
}

export default TopNav