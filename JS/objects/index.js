const person1 = {
    name: "Devansh",
    getFullName: function getFullName(params) {
        return params.name
    }
}

class person {
    name;

    constructor(parameters) {
        this.name = parameters.name
    }
}
console.time('Log times')
    console.log(typeof person) // object
    console.log(person1.getFullName({ name: "Ayush" }))
    const p1 = new person({ name: 'Devansh' });
    console.log(p1['name'])
console.timeEnd('Log times')

const carDetails = {
    name: "Amaze",
    brand: "Honda",
    unlock: function Unlock(pass) {
        console.log(pass === '12345' ? "Car Unlock" : "Theft Protection Activated")
    },
    lock: function lock(pass) {
        console.log(pass === '12345' ? "Car locked" : "Theft Protection Activated")
    },
}

const newCar = { ...carDetails } // Shallow Copy : Copy only the first level of Data

const car = ['BMW', 'Audi', 'Honda', 'Toyota', 'Kia', 'Hyundai']

console.table(car)

// // shallow Copy
// // Deep Copy
// // memory leak
// // get values of objects
// // get keys of objects
// // properties of objects
// // functions of objects


