//Logical Operators

//while comparing values the || and && operator come in handy
//We also use the == or === for equality
let result = '2' || '3' || 'Joe'
if (result == '2' || result == '3' || result == 'Joe' || result == 'mango') {
    console.log('Available')
}
else {
    console.log('Unavailable')
}

//Logical AND &&
//returns true only if both operands are tru
//if one side is false, it will result to false
console.log(true && true) // true
console.log(false && true) // false
console.log(false && false) // false

let a = 5, b = 10;
console.log(a < b && b > a) // true
console.log(a > b && b < a) // false

let user = { isLoggedIn: true, hasPermission: true }
//to view bankBalance, one needs to be logged in and has permission
if (user.isLoggedIn && user.hasPermission) {
    console.log('View your bank balance')
}

//Logical OR ||
//returns true if one side is true
//only when all sides are false, it will result into false
let userName = ''
let displayName = userName || 'guest'
console.log(displayName) // print either empty or guest

//Logical NOT !
//checks the opposit of the equation
console.log(!true) //false
console.log(!false) //true
let isActive = false
if (!isActive) {
    console.log("The system is not active")
}
else {
    console.log("The system is active")
}

//Logical assignment operator

//Order of operations : in JS, logical NOT has higher precedence than
//logical AND , which in turn has higher precedence than logical OR/
//Understanding the precedence is crucial for writing complex conditional statements
let _a = true
let _b = false
let _result = !_a && (_b || true) //!_a evaluates first, then &&, then ||
console.log(result) //false

