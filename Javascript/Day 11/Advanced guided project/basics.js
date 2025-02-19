//Fetching data from json server
async function fetchData(callbackfn) {
  try {
    let response = await fetch("http://localhost:3000/books");
    let data = await response.json(); //converting the response to JSON
      console.log("Data fetched successfully", data);   
      
      data.forEach(book => callbackfn(book));
      
  } catch (error) {
    console.log("Sorry there was an error!", error);
  }
}
//callback function 
function flagBooks(book) {
    
        console.log(`Caution: "${book.title}" is a ${book.genre} book. ( ${book.pages} pages )`);   
  
    setTimeout(() => {
         if (book.pages >= 500) {
           console.log(`⚠️ Warning: "${book.title}" has ${book.pages} pages!`);
         }
    }, 1000)    
}
function flagSpecificGenre(book) {
    let flaggedGenres = ["Fiction", "Dystopian", "Romance", "Fantasy", "Adventure", "Historical Fiction", "Epic Poetry"]
    if (flaggedGenres.includes(book.genre)) {
        console.log(`⚠️ Caution: "${book.title}" is a ${book.genre} book.`);
    }
}


fetchData(flag)
