//Synchronous programming
// tasks are performed one after another.
// Each task waits for the previous one to finish before it starts
// synchronous programming is blocking - one funciton has to be executed
//before the other starts

//eg connecting to a database
function connectDB() {
    //code for connecting to the DB

}
function fetchData() {
    connectDB(mongoDBInstance)
    //fetching data
}

//Asynchronous Programming
//It is non blocking meaning that asynchronous code lets other operations run while
//waiting for a task to complete. eg you can fetch data from a server without freezing the rest of your application

//eg connecting to a database
async function connectDB() {
    //code for connecting to the DB
    //do exception handling like:
    //No network/DB deleted
    await connectURL
}
async function fetchData() {
  await connectDB(mongoDBInstance);
  //fetching data
}

//You can handle asynchronous operations using
//1. callbacks
//2. promises
//3. async/await

//1. Callbacks
// function that is passed into another function as an
// argument and is executed after some operation or event completes.
// They are commonly used to handle tasks such as reading files,
//  making network requests, or processing data.

//function of callbacks - it enables asynchronous processes by returning
//the result back to the main function after operation end
function addCallback(z, callbackfn) {
    return callbackfn(z, 6)
}
function add(a, b) {
    return a + b
}
console.log(addCallback(10, add))

//map, reduce and filter are all callback functions passed inside
//other functions
//map(callbackfn: (value: number, index: number, array: number[])
//  => any, thisArg?: any): any[]
const arr = [1, 2, 3, 4, 5, 6]
const double = arr.map((num) => (num * 2))//this is an example of a callback function
console.log(double)

//The .map() method takes a callback function that doubles each number in the array.
//The callback function (num) => num * 2 is applied to each element of the array.

//Demonstrating a netflix example to get details of a certain video
//1. Login to netflix
//2. Get all the videos
//3. get one video from all the videos
//4. Get the details from that video

//1. Loggin in to netflix

function loginUser(email, password, callBackFn) {
    setTimeout(() => {
        console.log(`We are logging into Netflix`) 
        callBackFn({userEmail: email, userPassword: password})
    }, 3000)
}
//2. Get all the videos
function getAllVideos({userEmail},  callBackFn) {
    //we need the email and password to get all videos from the callBackFn
    setTimeout(() => {
        console.log(`We have all the recently watched videos`)
        callBackFn({ userEmail, videosInfo: ["Star wars", "The Mando", "The Lord of the rings"] }) 
    }, 3000)
}

//3. Get details of one video
function getVideoInfo(videosInfoObj, callBackFn) {
  //videos info is coming from get all videos which was passed inside callbackfn from getAllVideos
  setTimeout(() => {
    console.log(`We have the details of one video`);
    callBackFn({ video: videosInfoObj.videosInfo[1] }); //The Mando
  }, 3000);
}

//Executing the sequence of all asynchronous operations

 



