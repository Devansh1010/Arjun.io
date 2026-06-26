import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const User = () => {
  
  const user = useContext(UserContext)

  return (
   <>{user?.name}</>
  )
}

export default User