
import React, { useState } from 'react'
import CarContext, { type Car } from '../context/CarContext'

const CarProvider = ({children} : {children : React.ReactNode}) => {

    const [car] = useState<Car | null>({
        name: "Amaze",
        brand: "Honda",
        price : 8.25
    })

  return (
    <CarContext.Provider  value={car}>
        {children}
    </CarContext.Provider>
  )
}

export default CarProvider