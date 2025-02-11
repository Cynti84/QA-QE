//JavaScript conditionals

//conditions are basically an if statement that evaluates to true
//Basic if statement

let showering = true
if (showering) {
    console.log("You are a good boy")
}

//if...else
//if the condition was not satisfied, there is a fallback with an else statement
let heShowered = false
if(heShowered){
    console.log("You are a good boy indeed")
} else {
    console.log('You are a bad boy')
}

//in some situations, you can have multiple fallbacks
//else if statement - else if, else if, else if,..... else
let marks = 0;
let grade = ''
function myGrade(mark) {
    if (mark > 89) {
        grade = 'A'
    }
    else if (mark > 70) {
        grade = 'B'
    }
    else if (mark > 50) {
        grade = 'C'
    }
    else if (marks > 30) {
        grade = 'D'
        
    }
    else {
        grade = 'E'
    }
    return grade
}
console.log(`Your grade is: ${myGrade(78)}`)

