//Booleans

//Practical example:
const isAdmin = true;
const isStudent = false;
function showPaymentsModule(args) {
  //this can be an angular/react component
  if (args === true) {
    //show payment details
    console.log("You have the access rights to payment page");
  } else {
    //show page not authorized
    console.log("You dont have the access rights to payments page");
  }
}

showPaymentsModule(isAdmin);

//Boolean as a string
let a = "true";
console.log(typeof a);
let b = true;
console.log(typeof b);

//Boolean Context
//Equality operators (==): returns true if the operands are equal
//use == or ===
//== : checks if values are equal onnly
//=== : checks if the values and types are both equal

console.log(5 == "5");
console.log(5 === "5");

//Booleans can also be used to check inequality
//use != or !==
console.log(6 != 6); //false
console.log(6 !== 6); // false
console.log(6 != "6"); //false
console.log(6 !== "6"); // true

//real world example of != comparison using password
// import bcrypt from 'bcrypt'
// const password = "QWEiop5991"
// const hashedPassword = bcrypt.hashSync(password, 10)
// console.log(hashedPassword)

// assuming that you need to login to your app
// we need to compare the user password with the hashedpassword
// const comparedPasswords = bcrypt.compareSync(password, hashedPassword)
//  const comparedPasswords = bcrypt.compareSync("password", hashedPassword) // false

// console.log(comparedPasswords) //true
// function authLogin() {
     //this can be an angular/react component
//     if(comparedPasswords) {
         //show payment details
//         console.log("Loggin successfull")
//     } else {
         //show PageNotAuthorized
//         console.log("Login failed")
//     }
// }
// authLogin()



//&& keyword 
//its alogical operator that checks if the left and the right side are true 
//both sides should be true to evaluate to true  
console.log(true && true) //true
console.log(false && true) //false 
console.log(true && false) //false 
console.log(false && false) //false 
