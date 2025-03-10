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
const genreFilterElement = document.getElementById("genreFilter");
const sortYear = document.getElementById("sortYear");
const sortPages = document.getElementById("sortPages");
const searchBook = document.getElementById("searchInput");
//Asynchronous function to Fetch data from events
function fetchData() {
    return __awaiter(this, arguments, void 0, function* (params = {}) {
        try {
            const queryParams = new URLSearchParams(params).toString();
            const response = yield fetch(`http://localhost:3000/api/books${queryParams ? `?${queryParams}` : ""}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            });
            //if the response is not okay, throw the error to the catch block
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            const data = yield response.json();
            console.log("Fetched data 📚:", data);
            return data;
        }
        catch (error) {
            console.log("Sorry, cannot fetch data!🥱", error);
            return []; // Return empty array in case of error
        }
    });
}
function loadBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetchData(); //fetch data from events.ts
        if (response && response.books) {
            books = response.books;
            console.log("Data fetched successfully 🥳🥳", books);
            displayBooks(books);
        }
        else {
            console.error("Invalid response format:", response);
            displayBooks([]);
        }
    });
}
// this is a function to display the books dynamically
function displayBooks(booksToShow) {
    const bookContainer = document.getElementById("bookContainer");
    if (!bookContainer)
        return;
    bookContainer.innerHTML = ""; //this is to clear all books existing books before adding new ones
    if (booksToShow.length === 0) {
        bookContainer.innerHTML = "<p>No books found matching your criteria.</p>";
        return;
    }
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
    console.log("Close modal function called"); // Debugging log
    const bookModal = document.getElementById("bookModal") || null;
    if (!bookModal) {
        console.log("Modal not found");
        return;
    }
    bookModal.style.display = "none";
}
if (sortYear) {
    sortYear.addEventListener("click", function () {
        // Toggle between ascending and descending
        const currentSort = new URLSearchParams(window.location.search).get("sort");
        let newSort;
        if (currentSort === "year-asc") {
            newSort = "year-desc";
        }
        else {
            newSort = "year-asc";
        }
        // Update the URL parameter and trigger the filter
        updateQueryParam("sort", newSort);
        filterAndSortBooks();
    });
}
// Add similar functionality for sortPages
if (sortPages) {
    sortPages.addEventListener("click", function () {
        const currentSort = new URLSearchParams(window.location.search).get("sort");
        let newSort;
        if (currentSort === "pages-asc") {
            newSort = "pages-desc";
        }
        else {
            newSort = "pages-asc";
        }
        updateQueryParam('sort', newSort);
        filterAndSortBooks();
    });
}
// Helper function to update query parameters
function updateQueryParam(key, value) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    // Update the URL without refreshing the page
    window.history.pushState({}, '', url);
}
//this is a function to filter and sort books
function filterAndSortBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const searchTerm = document.getElementById("searchInput").value
                .toLowerCase()
                .trim();
            const genre = genreFilterElement ? genreFilterElement.value : "";
            const sort = new URLSearchParams(window.location.search).get("sort") || "";
            const params = {};
            if (searchTerm)
                params.search = searchTerm;
            if (genre && genre !== "all")
                params.genre = genre;
            if (sort)
                params.sort = sort;
            console.log("Filtering with params:", params);
            const filteredBooks = yield fetchData(params);
            if (Array.isArray(filteredBooks.books)) {
                displayBooks(filteredBooks.books);
                // Update button text to indicate current sort direction
                updateSortButtonLabels(sort);
            }
            else {
                console.error("Received invalid data format from server:", filteredBooks);
                displayBooks([]);
            }
        }
        catch (error) {
            console.error("Error filtering books:", error);
            displayBooks([]);
        }
    });
}
// Function to update the sort button labels based on current sort
function updateSortButtonLabels(sortParam) {
    if (sortYear) {
        if (sortParam === "year-asc") {
            sortYear.textContent = "Sort by Year ↑";
        }
        else if (sortParam === "year-desc") {
            sortYear.textContent = "Sort by Year ↓";
        }
        else {
            sortYear.textContent = "Sort by Year";
        }
    }
    if (sortPages) {
        if (sortParam === "pages-asc") {
            sortPages.textContent = "Sort by Pages ↑";
        }
        else if (sortParam === "pages-desc") {
            sortPages.textContent = "Sort by Pages ↓";
        }
        else {
            sortPages.textContent = "Sort by Pages";
        }
    }
}
// Event listeners for search
if (searchBook) {
    // Add input event for real-time filtering as user types
    searchBook.addEventListener("input", function () {
        console.log("Search input changed");
        filterAndSortBooks();
    });
    // Also keep the enter key functionality
    searchBook.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            console.log("Enter key pressed - searching for a book"); //degugging log
            filterAndSortBooks();
        }
    });
}
// Event listener for genre filter
if (!genreFilterElement) {
    console.log("Error: Genre filter element not found");
}
else {
    genreFilterElement.addEventListener("change", function () {
        console.log("Genre filter changed to:", genreFilterElement === null || genreFilterElement === void 0 ? void 0 : genreFilterElement.value);
        filterAndSortBooks();
    });
}
//this is a function to sort the books dynamically
// function sortBooks(criteria: keyof Book, order: "asc" | "desc") {
//   let sortedBooks: Book[] = [...books];
//   sortedBooks.sort((a, b) => {
//     if (order === "asc") {
//       return (a[criteria] as number) - (b[criteria] as number);
//     } else {
//       return (b[criteria] as number) - (a[criteria] as number);
//     }
//   });
//   displayBooks(sortedBooks);
// }
//event listener for sorting buttons
//sorting by year
// if (!sortYear) {
//   console.log("Error sorting by year");
// } else {
//   sortYear.addEventListener("click", function () {
//     const currentOrder =
//       this.getAttribute("data-order") === "asc" ? "desc" : "asc";
//     this.setAttribute("data-order", currentOrder);
//     sortBooks("year", currentOrder);
//   });
// }
//sorting by pages
// if (!sortPages) {
//   console.log("Error sorting by pages");
// } else {
//   sortPages.addEventListener("click", function () {
//     const currentOrder =
//       this.getAttribute("data-order") === "asc" ? "desc" : "asc";
//     this.setAttribute("data-order", currentOrder);
//     sortBooks("pages", currentOrder);
//   });
// }
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
//this is a function to update the total price of items in the cart
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
// Add modal close button event listener
const closeButton = document.querySelector(".close-modal");
if (closeButton) {
    closeButton.addEventListener("click", closeModal);
}
// Add window click event to close modal when clicking outside
window.addEventListener("click", (event) => {
    const bookModal = document.getElementById("bookModal");
    if (event.target === bookModal) {
        closeModal();
    }
});
// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
    loadBooks();
});
export {};
// Automatically load books when the script runs
// loadBooks();
//# sourceMappingURL=index.js.map