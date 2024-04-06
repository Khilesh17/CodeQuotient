// map
// filter
// foreach
// findIndex
// find
// reduce
// splice
// slice
// sort

const numbers = [1, 2, 3, 4, 5];

const doubledNumbers = numbers.map(num => num * 2);
console.log("Example of Map : ", doubledNumbers);

const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("Example of Filter : ", evenNumbers);

console.log("Example of forEach : ")
numbers.forEach(num => console.log(num)); // Output: 1 2 3 4 5

const index = numbers.findIndex(num => num > 2);
console.log("Example of FindIndex : ", index);


const value = numbers.find(num => num > 2);
console.log("Example of Find : ", value);

const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log("Example of Reduce : ", sum);


const slicedNumbers = numbers.slice(2, 4); 
console.log("Example of slice : ", slicedNumbers);


numbers.sort((a, b) => a - b);
console.log("Example of sort : ", numbers);


numbers.splice(2, 1);
console.log("Example of splice : ", numbers);