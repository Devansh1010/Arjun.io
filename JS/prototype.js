const arr = [1, 2, 3, 4, 5, 6]

if (!Array.prototype.myForEach) {

    Array.prototype.myForEach = function (callbackFn) {
        const result = []
        for (i = 0; i < this.length; i++) {
            const val = callbackFn(this[i], i)

            result.push(val)
        }

        return result
    }
}

if (!Array.prototype.myFilter) {
    Array.prototype.myFilter = function (callbackFn) {
        const result = []
        for (i = 0; i < this.length; i++) {
            const val = callbackFn(this[i], i)

            if(val){
                result.push(this[i])
            }
        }

        return result
    }
}
const newArr = arr.myFilter((e) => e%2 == 0)

console.log(newArr)

