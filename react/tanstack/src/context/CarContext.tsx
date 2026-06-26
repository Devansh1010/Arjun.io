import { createContext } from "react";

export type Car = {
    name: string,
    brand: string,
    price: number
}
const CarContext = createContext<Car | null>(null)

export default CarContext