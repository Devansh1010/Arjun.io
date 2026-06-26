
import './App.css'
import Car from './components/Car'
import User from './components/User'
import { UserProvider } from './providers/UserProvider'
import CarProvider from './providers/CarProvider'


function App() {


  return (
    <>
      <UserProvider>
        <User />
        <CarProvider>
          <Car />
        </CarProvider>
      </UserProvider>
    </>
  )
}

export default App
