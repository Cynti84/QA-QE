//Math operators
//we can do basic with JS
let num1 = 20;
let num2 = 23;
//addition
console.log(num1 + num2);
//subtraction

//multiplication

//division

//power
// let num = 4**2

//Increment
//Post increment
let salary = 90000;
console.log(salary++); // 90000 //salary had been added but you will realize it later
console.log(salary); // 90001

//Pre Increment
let salary1 = 80000;
console.log(++salary1); // 80001 // salary is already added
console.log(salary1);

const marks = [56, 45, 67, 87];
for (let i = 0; i < marks.length; i++) {
  console.log(`${marks.indexOf(marks[i])}: ${marks[i]}`);
  if (i === marks.indexOf(marks[i])) {
    console.log(true);
  } else {
    console.log(`I have stopped`);
  }
}

//Decrement
//Pre decrement
let num3 = 9;
console.log(--num3); //8

//post decrement
let num4 = 9;
console.log(num4--); // 9
console.log(num4); // 8

//Greater than or less than
console.log(10 < 11); //true
console.log(10 <= 11); //true
console.log(10 > 11); //false

//Math Objects
console.log(typeof Math); //object
//math is an object in JS
let radius = 7;
console.log(Math.PI * radius ** 2); //4
console.log(Math.sqrt(16));
let numbers = [1, 2, 3, 4, 5, 6, 7];
//numbers.forEach((number) => console.log(Math.max(number))) //prints all number
console.log("Max number is: ", Math.max(...numbers)); //spread operator //7
console.log("Mix number is: ", Math.min(...numbers)); //1

//Math.random() - returns a pseudo random number between 0 and 1
const invoiceNumber = Math.random() * 10000000000000000; //to remove decimal multiply by that
console.log(`BSNRTY${invoiceNumber}`);

//Math.floor() - returns the largest integer less than or equal to the input
console.log(Math.floor(4.5));

//Math.ceil() - Returns the smallest integer greater than or equal to the input
console.log(Math.ceil(4.5));
console.log(Math.ceil(4.1));

//Math.round() - static method returns the value of a number rounded to the nearest integer
