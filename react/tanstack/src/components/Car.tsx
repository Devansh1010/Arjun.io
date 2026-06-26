
import CarContext from '../context/CarContext'
import { useContext } from 'react'

const Car = () => {

  const car = useContext(CarContext)

  return (
    <>

      <div>{car?.name}</div>
      <div>{car?.brand}</div>
      <div>{car?.price}</div>


    </>
  )
}

export default Car