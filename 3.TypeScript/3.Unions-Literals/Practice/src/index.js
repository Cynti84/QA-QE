"use strict";
console.log("hello typescript!");
//Unions, Literals and Narrowing Exercise
//1. Unions and literals types
//Exercese 1: string or null
function getUsername(username) {
    if (username !== null) {
        return `User: ${username}`;
    }
    else {
        return "Guest";
    }
}
const result = getUsername('Alice');
const result2 = getUsername(null);
//Exercise 2: Restricting function parameters
function move(direction, distance) {
    // Move the specified distance in the given direction
}
move("up", 10);
move("left", 5);
// move('up-right', 10) Error: Argument of type '"up-right"' is not assignable to parameter of type '"up" | "down" | "left" | "right"'
//2. Narrowing
//Exercise 1: narrowing with if statements
function validateUsername(username) {
    if (username === null) {
        return false;
    }
    if (typeof username === 'string') {
        return username.length > 5;
    }
    return false;
}
console.log(validateUsername("Alice"));
console.log(validateUsername("Alice123"));
const handleResponse = (response) => {
    // How do we check if 'data' is in the response?
    if ('data' in response) {
        return response.data.id;
    }
    else {
        throw new Error(response.error);
    }
};
