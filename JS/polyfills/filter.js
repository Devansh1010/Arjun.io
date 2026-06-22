
if (Array.prototype.myfilter === undefined) {
    Array.prototype.myfilter = function (callback) {
        const res = [];

        for (let i = 0; i < this.length; i++) {
            const result = callback(this[i], i) 

            if(result){
                res.push(this[i])
            }
        }
        return res;
    }
}

const arr = [
    { Car: "Amaze", Price: 9 },
    { Car: "Desire", Price: 8 },
    { Car: "i20", Price: 7 },
    { Car: "City", Price: 13 },
]

const res = arr.myfilter(
    (car) => car.Price > 8
)

console.log(res)
console.log(arr)