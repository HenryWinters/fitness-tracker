import '../index.css'

const Notification = ({ notification }) => {

  if(notification.type === null) {
    return null
  } else

  if (notification.type === 'error') {
    return (
      <div className='notification-container'>
        <p className='error notification'>{notification.message}</p> 
      </div>
    )
  } else

    return (
      <div className='notification-container'>
        <p className='success notification'>{notification.message}</p>
      </div>
    )

}

export default Notification