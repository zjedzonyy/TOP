// Get access to UI
const displayElement = document.getElementById('display');
const buttons = document.getElementById('calculator').getElementsByTagName('button');

// // Mathematical equations, 
// 1. Do it  
// 2. Change value on the display
// 3. Return result

function add(a, b) {
    const c = parseFloat(a);
    const d = parseFloat(b);
    displayElement.innerText = `=${c + d}`;
    return c + d;
}

function substract(a, b) {
    const c = parseFloat(a);
    const d = parseFloat(b);
    displayElement.innerText = `=${c - d}`;
    return c - d;
}

function multiply(a, b) {
    const c = parseFloat(a);
    const d = parseFloat(b);
    displayElement.innerText = `=${c * d}`;
    return c * d;
}

function divide(a, b) {
    const c = parseFloat(a);
    const d = parseFloat(b);
    displayElement.innerText = `=${c / d}`;
    return c / d;
}

// Choose mathematical eq based on operator and call proper function
function operate(a, operator, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return substract(a, b);
        case "x":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

// Do things based on what you clicked
function populate() {
    let arr = [];

    for (let button of buttons) {
        button.addEventListener('click', function () {
            if (this.id === "ac") {
                displayElement.innerText = '';
                arr = [];
            } else if (this.id === 'equals') {
                let result = processArray(arr);
                if (result.operator === "/" && result.b === '0') {
                    alert("You cannot divide by zero!");
                    arr = [];
                    displayElement.innerText = '';
                } else {
                    operate(result.a, result.operator, result.b);
                }
            } else {
                displayElement.innerText += this.innerText;
                arr.push(this.innerText);
            }
        });
    }
}

// Process input
// 1. Loop through each element of the array 
// 2. Do thing based on what that element is
function processArray(arr) {
    let a = "";
    let b = "";
    let operator = null;

    for (let i = 0; i < arr.length; i++) {
        if (isDigit(arr[i]) || arr[i] === '.') {
            if (operator === null) {
                a += arr[i];
            } else {
                b += arr[i];
            }
        } else if (isOperator(arr[i])) {
            if (operator) {
                let result = operate(a, operator, b).toString();
                return processArray([result].concat(arr.slice(i)));
            } else {
                operator = arr[i];
            }
        }
    }

    if (operator) {
        return operate(a, operator, b);
    }

    return arr.length > 0 ? arr[0] : "";
}

// Aux functions
function isDigit(char) {
    return /\d/.test(char);
}

function isOperator(char) {
    return ['+', '-', 'x', '/'].includes(char);
}

// Initialization
populate();
