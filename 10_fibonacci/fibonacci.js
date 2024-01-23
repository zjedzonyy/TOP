const fibonacci = function(num) {
    let number = parseInt(num);
    let arr = [0, 1];
    if (number == 0 || number == 1) {
        return number;
    } else if (number < 0) {
        return "OOPS";
    } else {
        for (let i = 2; i <= number; i++) {
            let newe = arr[i - 1] + arr[i - 2];
            arr.push(newe); 
        }
    }
    return arr[number-1] + arr[number-2];
};


// Do not edit below this line
module.exports = fibonacci;
