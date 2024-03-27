const { sum, subtract, multiply, divide } = require("./calculator")

const sum1 = sum(11, 25);
const subtraction = subtract(11, 25);
const multiplication = multiply(11, 25);
const division = divide(11, 25);

console.log("Sum of Two no. is : ", sum1);
console.log("Difference of Two no. is : ", subtraction);
console.log("Multiplication of Two no. is : ", multiplication);
console.log("Division of Two no. is : ", division);