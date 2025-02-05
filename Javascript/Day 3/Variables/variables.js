let name = ""
var students = [];
const marks = {};
//naming convections
//1. Use cameLCase
let isLogginIn = true

//2. Start with a letter, underscore or dollar sign
// const #dollars = 234 will give an error
let dollar = 333
let $dollar = 333
let _dollar = 333

//be descriptive but not verbous
let myNumb = 20
let mySchoolRegistrationNumber = 20 //too verbous

//Types of data structures
//numbers, strings, booleans, nulls, undefined, objects, arrays, BigInts

//1. Numbers: integers, doubles, Big ints
console.log("Integer", 4)
console.log("Double", 7.89)
//Big ints are for numbers greater than 2 power 53-1
//add an n after the big number
const elonsWealth = 1500000000000000000n

//2. Strings- texts inside quotes '' or ""
console.log("My name is Cee")
//use typeof to check data type of data
console.log(typeof 8)
console.log(typeof "Cee")

//3. Booleans - true or false
const isAuthenticated = true
const isAdmin = false

//Example: isAuthenticated ? <ShowProfile/> : <ShowAuthPage/>

//4. Undefined
let student;
console.log(student)

//5. Null- If the data is empty, returns null - nullable
const noData = {num: null}
console.log(noData.num)

//6. Objects
// {} - empty object
let myData = {}
console.log(myData)
//to add data to object, you use . notation
myData.name = "Cee Girl"
myData.university = "Dedan Kimathi University"
console.log(myData)
console.log("myData is an", typeof myData)

//7. Arrays (it is a type of an object)
// []
let isMarried = false
const info = ["Cinti Lady", 22, "Dekut", { IdNumber: 890, nationality: "Kenyan" }, isMarried]
console.log(info)
console.log("Info is an", typeof info)

//why is an array an object? do research

//type coercion
console.log(typeof "5" + 3); //"53" (string concatenation)
console.log("5" + 3);
 
console.log(5 + "3");
console.log()

//change string to number
console.log(Number('56'))
console.log(typeof Number('56'))
console.log(parseInt('56'))
console.log(typeof parseInt('56'))

//number to string
let num = 57
console.log(num.toString())
console.log(typeof num)