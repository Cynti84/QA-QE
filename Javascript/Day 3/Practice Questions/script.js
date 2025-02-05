//Question 1. Declaring variables
let age = 25;
const schoolName = "Greenwood High";
let studentList = [];

/* Difference between let, const and var
a. let: used for variables that can be reassigned later 
   const: used for variables that shouldn't change once set
   var: is like let but is an old school way of declaring variables
b. var: can be redeclared and reassigned in the same scope
   let: cannot be redeclared in the same scope but can be reassigned
   const: cannot be redeclared nor reassinged */

/*Question 2. Naming Conventions
  a. Invalid variable name: let 1stPlace = "John";
  b. Why 'const #taxRate = 0.16;' is incorrect: Because identifiers in JS
     cannot start in # unless they are private fields inside a class.
  c. Correcting variable name in let MyvariableNAME = "JavaScript"*/
let myVariableName = "JavaScript";

//Question 3. Identifying Data types
//  a. What will be the output?
console.log(typeof "Hello"); // string
console.log(typeof 99); // number
console.log(typeof true); // bool
console.log(typeof undefined); // undefined
//  b. Identify data types in array:
let data = ["Kenya", 34, false, { country: "USA" }, null];
console.log(typeof data[0]); // "string"
console.log(typeof data[1]); // "number"
console.log(typeof data[2]); // "boolean"
console.log(typeof data[3]); // "object"
console.log(typeof data[4]); // "Null object"

//  c. BigInt definition and Example
//  Definition: It is a data type used for very large numbers that exceed the limit of 2^53-1
const bigNum = 67000000000000000000000000n; //Example

//Question 4. Objects & Arrays
//  a. Create an object person with properties name, age and city
let person = { name: "Cee Girl", age: 20, city: "LA" };
//  b. Add a new property email to the person
person.email = "Boston University";
console.log(person);
//  c. Declare an array fruits with three fruit names
let fruits = ["peach", "apricot", "lemon"];
console.log(fruits[1]);

//Question 5. Type Coercion
//  a. What will be the output of the following
console.log("5" + 2); // 52
console.log("5" - 2); // 3
//  b. Convert the string "100" into a number
console.log(Number("100"));
console.log(typeof Number("100"));
//  c. Convert the number 50 into a string
let num = 50;
let str = num.toString();
console.log(str);
console.log(typeof str);
//  d. What will be the result of this operation
console.log(5 + true); // 6
