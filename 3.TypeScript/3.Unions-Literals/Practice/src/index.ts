console.log("hello typescript!")

//Unions, Literals and Narrowing Exercise
//1. Unions and literals types

//Exercese 1: string or null

function getUsername(username: string | null) {
  if (username !== null) {
    return `User: ${username}`;
  } else {
    return "Guest";
  }
}
const result = getUsername('Alice')
const result2 = getUsername(null)

//Exercise 2: Restricting function parameters

function move(direction: 'up' | 'down' | 'left' | 'right', distance: number) {
  // Move the specified distance in the given direction
}
move("up", 10);
move("left", 5);

// move('up-right', 10) Error: Argument of type '"up-right"' is not assignable to parameter of type '"up" | "down" | "left" | "right"'

//2. Narrowing

//Exercise 1: narrowing with if statements
function validateUsername(username: string | null): boolean {
    if (username === null) {
       return false
    }
    else{
        return username.length > 5
    }
    return false;
}    

console.log(validateUsername("Alice"));
console.log(validateUsername("Alice123"));

//Exercise 2: throwing errors to narrow
/*const appElement = document.getElementById("app");
if (!appElement) {
    throw new Error("error")
}
*/

//Exercise 3: Using in to narrow
type APIResponse =
  | {
      data: {
        id: string;
      };
    }
  | {
      error: string;
    };

const handleResponse = (response: APIResponse) => {
  // How do we check if 'data' is in the response?

  if ('data' in response) {
    return response.data.id ;
  } else {
    throw new Error(response.error);
  }
};  

//Unknown type
const unknownFn = (input: unknown)=>{
  console.log(input)
  
}

unknownFn("hello")
unknownFn(54)
unknownFn([1, 2, 3])

// //void type funciton
// const voidFn = () => { }

// //never type funciton
// const neverFn = () => {
//   throw new Error("This fn will never return")
// }

// //never type input
// function neverInput(input:never) {
  
// }
// neverInput(neverFn())

const somethingDangerous = () => {
  if (Math.random() > 0.5) {
    throw new Error('Something went wrong')
  }

  return 'all good'
}

//Exercise: Narrowing Errors with instanceof
try {
  somethingDangerous()
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}

//Narrowing unknown to a value




