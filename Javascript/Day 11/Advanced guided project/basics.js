let books = []; //array to store the books
//let cart = [] //array to store the cart items

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
            <p><strong>Year:</strong> ${book.year}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p class="price">${book.price}$</p>
            <div class="buy-and-cart">
             <button class="add-cart" style="">Add to Cart</button>
            </div>
    `;
    bookContainer.appendChild(bookCard);
    const bookCardImage = bookCard.querySelector(".book-cover");
    bookCardImage.onclick = () => openModal(book);
  });
  ShoppingCart();
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
  if (event.key === "Enter") {
    //to check if the enter key is pressed. if enter key is pressed, do the following:
    const searchInput = document
      .getElementById("searchInput")
      .value.toLowerCase();
    if (searchInput === "") {
      displayBooks(books);
    } else {
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
    } else {
      return b[criteria] - a[criteria];
    }
  });
  displayBooks(sortedBooks);
}

//event listener for sorting buttons
document.getElementById("sortYear").addEventListener("click", function () {
  const currentOrder =
    this.getAttribute("data-order") === "asc" ? "desc" : "asc";
  this.setAttribute("data-order", currentOrder);
  sortBooks("year", currentOrder);
});
document.getElementById("sortPages").addEventListener("click", function () {
  const currentOrder =
    this.getAttribute("data-order") === "asc" ? "desc" : "asc";
  this.setAttribute("data-order", currentOrder);
  sortBooks("pages", currentOrder);
});

// implementing the shopping cart

const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const ShoppingCart = () => {
  const addCartButtons = document.querySelectorAll(".add-cart");
  addCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productBox = event.target.closest(".book-card");
      addToCart(productBox);
    });
  });

  const cartContent = document.querySelector(".cart-content");

  //this function adds an item into the cart
  const addToCart = (productBox) => {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector("h3").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    //to avoid product duplication
    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for (let item of cartItems) {
      if (item.textContent === productTitle) {
        alert("This item is already in the cart");
        return;
      }
    }

    //product details to add into the cart box
    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `  
          <img src="${productImgSrc}" />
          <div class="cart-detail">
            <h3 class="cart-product-title">${productTitle}</h3>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
              <button id="decrement">-</button>
              <span class="number">1</span>
              <button id="increment">+</button>
            </div>
         </div>
          <i class="ri-delete-bin-line cart-remove"></i>        
  `;
    cartContent.appendChild(cartBox);

    //to be able to remove item from the cart
    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
      cartBox.remove();
      updateCartCount(-1);
      updateTotalPrice();
    });

    cartBox
      .querySelector(".cart-quantity")
      .addEventListener("click", (event) => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = numberElement.textContent;

        if (event.target.id === "decrement" && quantity > 1) {
          quantity--;
          if (quantity === 1) {
            decrementButton.style.color = "#999";
          }
        } else if (event.target.id === "increment") {
          quantity++;
          decrementButton.style.color = "#333";
        }
        numberElement.textContent = quantity;
        updateTotalPrice();
      });
    updateCartCount(1);
    updateTotalPrice();
  };
};

//this is a funciton to update the total price of items in the cart
const updateTotalPrice = () => {
  const totalPriceElement = document.querySelector(".total-price");
  const cartBoxes = document.querySelectorAll(".cart-box");
  let total = 0;

  cartBoxes.forEach((cartBox) => {
    const priceElement = cartBox.querySelector(".cart-price");
    const quantityElement = cartBox.querySelector(".number");

    if (priceElement && quantityElement) {
      const price = parseFloat(
        priceElement.textContent.replace("$", "").trim()
      );
      const quantity = parseInt(quantityElement.textContent.trim(), 10);
      total += price * quantity;
    }
  });
  totalPriceElement.textContent = `$${total.toFixed(2)}`;
};

let cartItemCount = 0;
const updateCartCount = (change) => {
  const cartItemCountBadge = document.querySelector(".cart-item-count");
  cartItemCount += change;
  if (cartItemCount > 0) {
    cartItemCountBadge.style.visibility = "visible";
    cartItemCountBadge.textContent = cartItemCount;
  } else {
    cartItemCountBadge.style.visibility = "hidden";
    cartItemCountBadge.textContent = "";
  }
};

const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () => {
  const cartBoxes = document.querySelectorAll(".cart-box");
  if (cartBoxes.length === 0) {
    alert("Your cart is empty. Please add items to your cart before buying");
    return;
  }
  cartBoxes.forEach((cartBox) => cartBox.remove());
  cartItemCount = 0;
  updateCartCount(0);
  updateTotalPrice();
  alert("Thank you for your purchase");
});

fetchData();
