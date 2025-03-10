var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let books = []; //array to store the books
//let cart = [] //array to store the cart items
//Asynchronous function to Fetch data from json server only once and store them
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3000/books");
            //if the response is not okay, throw the error to the catch block
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            books = yield response.json(); //converting the response to JSON
            console.log("Data fetched successfully ✅", books);
            displayBooks(books);
        }
        catch (error) {
            console.log("Sorry, cannot fetch data!", error);
        }
    });
}
// this is a function to display the books dynamically
function displayBooks(booksToShow) {
    const bookContainer = document.getElementById("bookContainer");
    if (!bookContainer)
        return;
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
        if (!bookCardImage)
            return;
        bookCardImage.onclick = () => openModal(book);
    });
    ShoppingCart();
}
//this is a function to open a books modal and check its information more closely
function openModal(book) {
    const modalTitle = document.getElementById("modalTitle");
    const modalAuthor = document.getElementById("modalAuthor");
    const modalGenre = document.getElementById("modalGenre");
    const modalYear = document.getElementById("modalYear");
    const modalPages = document.getElementById("modalPages");
    const modalDescription = document.getElementById("modalDescription");
    const modalImage = document.getElementById("modalImage");
    const bookModal = document.getElementById("bookModal");
    //to check if elements exist before modifying them
    if (!modalTitle ||
        !modalAuthor ||
        !modalGenre ||
        !modalYear ||
        !modalPages ||
        !modalDescription ||
        !modalImage ||
        !bookModal) {
        console.log("one or more modals are missing in the dom", Error);
        return;
    }
    modalTitle.textContent = book.title;
    modalAuthor.textContent = book.author;
    modalGenre.textContent = book.genre;
    modalYear.textContent = book.year.toString(); // Convert number to string
    modalPages.textContent = book.pages.toString(); // Convert number to string
    modalDescription.textContent =
        book.description || "No description available.";
    modalImage.src = book.image.toString(); // Convert URL to string
    bookModal.style.display = "block";
}
//this is a function to close the book modal
function closeModal() {
    const bookModal = document.getElementById("bookModal");
    if (!bookModal)
        return;
    bookModal.style.display = "none";
}
//this is a function to filter books by search input
function searchBooks(event) {
    if (event.key === "Enter") {
        //to check if the enter key is pressed. if enter key is pressed, do the following:
        const searchInputElement = document.getElementById("searchInput");
        if (!searchInputElement)
            return;
        const searchInput = searchInputElement.value.toLowerCase();
        if (searchInput === "") {
            displayBooks(books);
        }
        else {
            const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(searchInput) ||
                book.author.toLowerCase().includes(searchInput));
            displayBooks(filteredBooks);
        }
    }
}
//this is an event listener for search
const searchInput = document.getElementById("searchInput");
if (!searchInput) {
    console.log("Error searching books");
}
else {
    searchInput.addEventListener("keydown", searchBooks);
}
//this is a funcition to filter books by genre
function filterByGenre() {
    const selectedGenreElement = document.getElementById("genreFilter");
    if (!selectedGenreElement)
        return;
    const selectedGenre = selectedGenreElement.value;
    const filteredBooks = selectedGenre
        ? books.filter((book) => book.genre === selectedGenre)
        : books;
    displayBooks(filteredBooks);
}
//this is an event listener for filter
const genreFilterElement = document.getElementById("genreFilter");
if (!genreFilterElement) {
    console.log("Error searching books");
}
else {
    genreFilterElement.addEventListener("change", filterByGenre);
}
//this is a function to sort the books dynamically
function sortBooks(criteria, order) {
    let sortedBooks = [...books];
    sortedBooks.sort((a, b) => {
        if (order === "asc") {
            return a[criteria] - b[criteria];
        }
        else {
            return b[criteria] - a[criteria];
        }
    });
    displayBooks(sortedBooks);
}
//event listener for sorting buttons
const sortYear = document.getElementById("sortYear");
if (!sortYear) {
    console.log("Error sorting by year");
}
else {
    sortYear.addEventListener("click", function () {
        const currentOrder = this.getAttribute("data-order") === "asc" ? "desc" : "asc";
        this.setAttribute("data-order", currentOrder);
        sortBooks("year", currentOrder);
    });
}
const sortPages = document.getElementById("sortPages");
if (!sortPages) {
    console.log("Error sorting by pages");
}
else {
    sortPages.addEventListener("click", function () {
        const currentOrder = this.getAttribute("data-order") === "asc" ? "desc" : "asc";
        this.setAttribute("data-order", currentOrder);
        sortBooks("pages", currentOrder);
    });
}
// implementing the shopping cart
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
cartIcon === null || cartIcon === void 0 ? void 0 : cartIcon.addEventListener("click", () => cart === null || cart === void 0 ? void 0 : cart.classList.add("active"));
cartClose === null || cartClose === void 0 ? void 0 : cartClose.addEventListener("click", () => cart === null || cart === void 0 ? void 0 : cart.classList.remove("active"));
//this is the shopping cart function. it contains all the functionalities to add items into the cart,
// remove them, update their number, etc
const ShoppingCart = () => {
    const addCartButtons = document.querySelectorAll(".add-cart");
    addCartButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const target = event.target;
            const productBox = target.closest(".book-card");
            if (productBox) {
                addToCart(productBox);
            }
        });
    });
    const cartContent = document.querySelector(".cart-content");
    if (!cartContent) {
        console.log("Cart content is null");
    }
    //this function adds an item into the cart
    const addToCart = (productBox) => {
        var _a, _b, _c, _d;
        const productImgSrcElement = productBox.querySelector("img");
        const productTitleElement = productBox.querySelector("h3");
        const productPriceElement = productBox.querySelector(".price");
        if (!productImgSrcElement || !productTitleElement || !productPriceElement)
            return;
        const productImgSrc = productImgSrcElement.src;
        const productTitle = ((_a = productTitleElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
        const productPrice = ((_b = productPriceElement.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "";
        // this functionality helps to avoid product duplication
        const cartItems = cartContent === null || cartContent === void 0 ? void 0 : cartContent.querySelectorAll(".cart-product-title");
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
        cartContent === null || cartContent === void 0 ? void 0 : cartContent.appendChild(cartBox);
        //to be able to remove item from the cart
        (_c = cartBox.querySelector(".cart-remove")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
            cartBox.remove();
            updateCartCount(-1);
            updateTotalPrice();
        });
        //this is the functionality for incrementing and decrementing the no of books in the shopping cart
        (_d = cartBox
            .querySelector(".cart-quantity")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", (event) => {
            const numberElement = cartBox.querySelector(".number");
            const decrementButton = cartBox.querySelector("#decrement");
            let quantity = parseInt(numberElement.textContent || "1", 10);
            const target = event.target;
            if (target.id === "decrement" && quantity > 1) {
                quantity--;
                if (quantity === 1) {
                    decrementButton.style.color = "#999";
                }
            }
            else if (target.id === "increment") {
                quantity++;
                decrementButton.style.color = "#333";
            }
            numberElement.textContent = quantity.toString();
            updateTotalPrice();
        });
        updateCartCount(1);
        updateTotalPrice();
    };
};
//this is a funciton to update the total price of items in the cart
const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price") || null;
    if (!totalPriceElement)
        return;
    const cartBoxes = document.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach((cartBox) => {
        var _a, _b;
        const priceElement = cartBox.querySelector(".cart-price") || null;
        const quantityElement = cartBox.querySelector(".number") || null;
        if (priceElement && quantityElement) {
            const price = parseFloat(((_a = priceElement.textContent) === null || _a === void 0 ? void 0 : _a.replace("$", "").trim()) || "0");
            const quantity = parseInt(((_b = quantityElement.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "1", 10);
            total += price * quantity;
        }
    });
    totalPriceElement.textContent = `$${total.toFixed(2)}`;
};
//this is the functionality to update the cart count badge that appears in the cart icon
let cartItemCount = 0;
const updateCartCount = (change) => {
    const cartItemCountBadge = document.querySelector(".cart-item-count") || null;
    if (!cartItemCountBadge)
        return;
    cartItemCount += change;
    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount.toString();
    }
    else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
    }
};
//this is the functionality for the 'buy now' button
const buyNowButton = document.querySelector(".btn-buy") || null;
if (buyNowButton) {
    buyNowButton.addEventListener("click", () => {
        const cartBoxes = document.querySelectorAll(".cart-box");
        if (cartBoxes.length === 0) {
            alert("Your cart is empty. Please add items to your cart before buying"); //if cart is empty, alert them when they press buy now button
            return;
        }
        cartBoxes.forEach((cartBox) => cartBox.remove());
        cartItemCount = 0;
        updateCartCount(0);
        updateTotalPrice();
        alert("Thank you for your purchase");
    });
}
else {
    console.log("Error: Buy Now button not found.");
}
fetchData();
export {};
//# sourceMappingURL=index.js.map