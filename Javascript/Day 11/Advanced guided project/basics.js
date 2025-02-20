let books = []; //array to store the books
let cart = [] //array to store the cart items

//Asynchronous function to Fetch data from json server only once and store them
async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/books");
    //if the response is not okay, throw the error to the catch block
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    books = await response.json(); //converting the response to JSON
    console.log("Data fetched successfully ✅", books);
    displayBooks(books);

  } catch (error) {
    console.log("Sorry, cannot fetch data!", error);
  }
}

// this is a function to display the books dynamically
function displayBooks(booksToShow) {
  const bookContainer = document.getElementById("bookContainer");
  bookContainer.innerHTML = ""; //this is to clear all books existing books before adding new ones
  booksToShow.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `
    <img src="${book.image}" alt="${book.title}" class="book-cover">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <p><strong>Year:</strong> ${book.year}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <button class="buy" style="background-color: red;">Buy Now</button>
    `;
    bookCard.onclick = () => openModal(book);
    bookContainer.appendChild(bookCard);
  });
}

//this is a function to open a books modal and check its information more closely
function openModal(book) {
  document.getElementById("modalTitle").textContent = book.title;
  document.getElementById("modalAuthor").textContent = book.author;
  document.getElementById("modalGenre").textContent = book.genre;
  document.getElementById("modalYear").textContent = book.year;
  document.getElementById("modalPages").textContent = book.pages;
  document.getElementById("modalDescription").textContent =
    book.description || "No description available.";
  document.getElementById("modalImage").src = book.image;
  document.getElementById("bookModal").style.display = "block";
}

//this is a function to close the book modal
function closeModal() {
  document.getElementById("bookModal").style.display = "none";
}

//this is a function to filter books by search input
function searchBooks(event) {
  if (event.key === "Enter") { //to check if the enter key is pressed. if enter key is pressed, do the following:
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    if (searchInput === "") {
      displayBooks(books)
    }
    else {
      const filteredBooks = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchInput) ||
          book.author.toLowerCase().includes(searchInput)
      );
      displayBooks(filteredBooks);
    }
  }
}

//this is an event listener for search
document.getElementById("searchInput").addEventListener("keydown", searchBooks);

//this is a funcition to filter books by genre
function filterByGenre() {
  const selectedGenre = document.getElementById("genreFilter").value;
  const filteredBooks = selectedGenre
    ? books.filter((book) => book.genre === selectedGenre)
    : books;
    
  displayBooks(filteredBooks);
}

//this is an event listener for filter
document
  .getElementById("genreFilter")
  .addEventListener("change", filterByGenre);

//this is a function to sort the books dynamically
function sortBooks(criteria, order) {
  let sortedBooks = [...books];

  sortedBooks.sort((a, b) => {
    if (order === "asc") {
      return a[criteria - b[criteria]];
    }
    else {
      return b[criteria] - a[criteria];
    }
  });
  displayBooks(sortedBooks);
}

//event listener for sorting buttons
document.getElementById("sortYear").addEventListener("click", function (){
  const currentOrder = this.getAttribute("data-order") === "asc" ? "desc" : "asc"
  this.setAttribute("data-order", currentOrder)
  sortBooks("year", currentOrder)
})
document.getElementById("sortPages").addEventListener("click", function () {
  const currentOrder =
    this.getAttribute("data-order") === "asc" ? "desc" : "asc";
  this.setAttribute("data-order", currentOrder);
  sortBooks("pages", currentOrder);
});

//this function adds books to cart
function addToCart(bookId) {
  const book = books.find((bk) => bk.id === bookId)
}



fetchData();
