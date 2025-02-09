import chalk from "chalk"
//Strings

let myName = "" //empty string
let myBook = "Introduction to Javascript" //double quotes
let statement = 'I love to code' //single quotes

//String Properties
//1. Length - returns the number of characters in a string
let name = 'Alice'
console.log(name.length) // 5

//2. charAt() - returns the characer at the specified index in a string
// s h a k i r a
// 0 1 2 3 4 5 6
let fname = "shakira"
console.log(fname.charAt(3)) // k

//3. concat - concatenates or joins two strings together
let firstname = "Julia"
let secondname = "Mwangi"
console.log(firstname.concat(secondname)) //JuliaMwangi
// to create a space between the strings
console.log(firstname.concat(' ' + secondname)) // es5 // output: Julia Mwangi
console.log(firstname.concat(' ' + "Malik")) //es5 // output: Julia Malik
console.log(firstname.concat( ` ${secondname}`)) //es6 // output: Julia Mwangi

//4. IndexOf - returns the inded of the first occurance of a specified value in a string
// I am a student
// 0123456789.....
const lname = "Ann Kipkoech Keio"
console.log(lname.indexOf("K")) // 4

//includes- returns true if a string contains a specified value
console.log(lname.includes("Keio")) //true
console.log(lname.includes("keio")) //false

//5. toLowerCase() - converts a string to lowercase letters
console.log("ELEPHANT".toLowerCase()) // elephant
let animalName = "Elephant"
console.log(animalName.toLowerCase())

//6. toUpperCase() - converts a string to uppercase letters
console.log("elephant".toUpperCase()) // ELEPHANT
let animal = "elephant"
console.log(animal.toUpperCase())

//7. Split - splits a string object into an array of strings by separating the strings into sub arrays
//Eg: performing reverse using split-
//"money".split("").reverse()
console.log("wendani".split()) // [ 'wendani]
console.log("wendani".split(" ")) // [ 'wendani' ]
console.log("wendani".split("")) // (7) [ 'w', 'e',...]

//8. Substring - extracts character from a string between two specified indices
// subsring(startingIndex, endingIndex-1)
let sentence = "I am a student"
console.log(sentence.substring(7, 11)) // stud - from 7 end at 11-1 ie (10)

//substr - extracts parts of a string
// beginiing at the charater of the specified position
// and returns the specified numbers of character
// substr(statingIndex, numberOfCharacters)
console.log(sentence.substr(7, 4)) // stud - from 7 index, return 4 characters

let sentence1 = "Hellowz My name is Cee"
console.log(sentence1.substr(2, 7)) //llowz M

//9. trim - removes white spaces from both ends of a string
let sent = '    Hi I am availabe    '
console.log(sent) //           Hi I am available
console.log(sent.trim()) // Hi I am available
//remove white spaces at the start only
console.log(sent.trimStart()) // Hi I am available
// if there was any white space at the end, it won't be removed if you are using only trimStart()
// to prove trimEnd/trimStart still exists:
// log the original string with yellow highlighting
console.log(chalk.yellow(`Original: [${sent}] `))
//Trim spaces from both ends
console.log(chalk.red(`Trimmed: [${sent.trim()}]`))
//Trim only from the start
console.log(chalk.yellow(`Trim Start: [${sent.trimStart()}]`))
//Trim only at the end
console.log(chalk.red(`Trim end: [${sent.trimEnd()}]`))



