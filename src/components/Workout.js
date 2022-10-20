const Workout = ({workout}) => {

    console.log(workout)
    const totalSets = workout.workout.length
    const totalReps = workout.workout.reduce((accumulator, value) => {
        return accumulator + parseInt(value.reps)
    }, 0)

    return (
        <div>
            <h3>{workout.user[0].name}</h3>
            <h3>{workout.workoutTime}</h3> 
            <h3>{workout.workoutTitle}</h3> 
            <p>{workout.workoutNote}</p> 
            <p>{totalSets} Sets</p> 
            <p>{totalReps} Reps</p>
            <p>{workout.likeCount} Likes</p>
        </div>
    )
}

export default Workout 