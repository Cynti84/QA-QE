import { Book, BooksArray } from "./types.js";

let books: BooksArray = []; //array to store the books

const searchBook = document.getElementById("searchInput") as HTMLInputElement;
const genreFilterElement = document.getElementById(
  "genreFilter"
) as HTMLSelectElement | null;
const sortYear = document.getElementById(
  "sortYear"
) as HTMLButtonElement | null;
const sortPages = document.getElementById("sortPages");

//Asynchronous function to Fetch data from events
async function fetchData(params: Record<string, string> = {}) {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(
      `http://localhost:3000/api/books${queryParams ? `?${queryParams}` : ""}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    //if the response is not okay, throw the error to the catch block
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched data 📚:", data);
    return data;
  } catch (error) {
    console.log("Sorry, cannot fetch data!🥱", error);
    return []; // Return empty array in case of error
  }
}

// Load books from API and display them on the page
async function loadBooks() {
  const response = await fetchData(); //fetch data from events.ts
  if (response && response.books) {
    books = response.books;
    console.log("Data fetched successfully 🥳🥳", books);
    displayBooks(books);
  } else {
    console.error("Invalid response format:", response);
    displayBooks([]);
  }
}
// this is a function to display the books dynamically
function displayBooks(booksToShow: BooksArray) {
  const bookContainer: HTMLElement | null =
    document.getElementById("bookContainer");
  if (!bookContainer) return;
  bookContainer.innerHTML = ""; //this is to clear all books existing books before adding new ones

  if (booksToShow.length === 0) {
    bookContainer.innerHTML = "<p>No books found matching your criteria.</p>";
    return;
  }

  booksToShow.forEach((book: Book) => {
    const bookCard: HTMLDivElement = document.createElement("div");
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
    const bookCardImage: HTMLElement | null =
      bookCard.querySelector(".book-cover");
    if (!bookCardImage) return;
    bookCardImage.onclick = () => openModal(book);
  });
  ShoppingCart();
}

//this is a function to open a books modal and check its information more closely
function openModal(book: Book) {
  const modalTitle = document.getElementById("modalTitle");
  const modalAuthor = document.getElementById("modalAuthor");
  const modalGenre = document.getElementById("modalGenre");
  const modalYear = document.getElementById("modalYear");
  const modalPages = document.getElementById("modalPages");
  const modalDescription = document.getElementById("modalDescription");
  const modalImage = document.getElementById("modalImage") as HTMLImageElement;
  const bookModal = document.getElementById("bookModal");

  //to check if elements exist before modifying them
  if (
    !modalTitle ||
    !modalAuthor ||
    !modalGenre ||
    !modalYear ||
    !modalPages ||
    !modalDescription ||
    !modalImage ||
    !bookModal
  ) {
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
  const bookModal =
    (document.getElementById("bookModal") as HTMLElement) || null;
  if (!bookModal) {
    console.log("Modal not found");
    return;
  }
  bookModal.style.display = "none";
}

// Toggle sorting by year between ascending and descending
if (sortYear) {
  sortYear.addEventListener("click", function () {
    // Toggle between ascending and descending
    const currentSort = new URLSearchParams(window.location.search).get("sort");
    let newSort;

    if (currentSort === "year-asc") {
      newSort = "year-desc";
    } else {
      newSort = "year-asc";
    }

    // Update the URL parameter and trigger the filter
    updateQueryParam("sort", newSort);
    filterAndSortBooks();
  });
}

// Toggle sorting by pages between ascending and descending
if (sortPages) {
  sortPages.addEventListener("click", function () {
    const currentSort = new URLSearchParams(window.location.search).get("sort");
    let newSort;

    if (currentSort === "pages-asc") {
      newSort = "pages-desc";
    } else {
      newSort = "pages-asc";
    }

    updateQueryParam("sort", newSort);
    filterAndSortBooks();
  });
}

// Helper function to update query parameters
function updateQueryParam(key: string, value: string) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  // Update the URL without refreshing the page
  window.history.pushState({}, "", url);
}

//this is a function to filter and sort books
async function filterAndSortBooks(): Promise<void> {
  try {
    const searchTerm = (
      document.getElementById("searchInput") as HTMLInputElement
    ).value
      .toLowerCase()
      .trim();
    const genre = genreFilterElement ? genreFilterElement.value : "";
    const sort = new URLSearchParams(window.location.search).get("sort") || "";

    const params: Record<string, string> = {};

    if (searchTerm) params.search = searchTerm;
    if (genre && genre !== "all") params.genre = genre;
    if (sort) params.sort = sort;

    console.log("Filtering with params:", params);

    const filteredBooks = await fetchData(params);
    if (Array.isArray(filteredBooks.books)) {
      displayBooks(filteredBooks.books);

      // Update button text to indicate current sort direction
      updateSortButtonLabels(sort);
    } else {
      console.error("Received invalid data format from server:", filteredBooks);
      displayBooks([]);
    }
  } catch (error) {
    console.error("Error filtering books:", error);
    displayBooks([]);
  }
}

// Function to update the sort button labels based on current sort
function updateSortButtonLabels(sortParam: string) {
  if (sortYear) {
    if (sortParam === "year-asc") {
      sortYear.textContent = "Sort by Year ↑";
    } else if (sortParam === "year-desc") {
      sortYear.textContent = "Sort by Year ↓";
    } else {
      sortYear.textContent = "Sort by Year";
    }
  }

  if (sortPages) {
    if (sortParam === "pages-asc") {
      sortPages.textContent = "Sort by Pages ↑";
    } else if (sortParam === "pages-desc") {
      sortPages.textContent = "Sort by Pages ↓";
    } else {
      sortPages.textContent = "Sort by Pages";
    }
  }
}

// Set up search input event listeners for real-time filtering
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
} else {
  genreFilterElement.addEventListener("change", function () {
    console.log("Genre filter changed to:", genreFilterElement?.value);
    filterAndSortBooks();
  });
}

// Get shopping cart UI elements
const cartIcon = document.querySelector("#cart-icon") as HTMLElement | null;
const cart = document.querySelector(".cart") as HTMLElement | null;
const cartClose = document.querySelector("#cart-close") as HTMLElement | null;

// Setup cart open/close functionality
cartIcon?.addEventListener("click", () => cart?.classList.add("active"));
cartClose?.addEventListener("click", () => cart?.classList.remove("active"));

//this is the shopping cart function. it contains all the functionalities to add items into the cart,
// remove them, update their number, etc
const ShoppingCart = () => {
  // Add click event to all "Add to Cart" buttons
  const addCartButtons: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll(".add-cart");
  addCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const productBox = target.closest(".book-card") as HTMLElement | null;
      if (productBox) {
        addToCart(productBox);
      }
    });
  });

  const cartContent = document.querySelector(
    ".cart-content"
  ) as HTMLElement | null;
  if (!cartContent) {
    console.log("Cart content is null");
  }

  //this function adds an item into the cart
  const addToCart = (productBox: HTMLElement) => {
    const productImgSrcElement = productBox.querySelector(
      "img"
    ) as HTMLImageElement | null;
    const productTitleElement = productBox.querySelector(
      "h3"
    ) as HTMLElement | null;
    const productPriceElement = productBox.querySelector(
      ".price"
    ) as HTMLElement | null;

    if (!productImgSrcElement || !productTitleElement || !productPriceElement)
      return;
    const productImgSrc = productImgSrcElement.src;
    const productTitle = productTitleElement.textContent?.trim() || "";
    const productPrice = productPriceElement.textContent?.trim() || "";

    // this functionality helps to avoid product duplication
    const cartItems = cartContent?.querySelectorAll(
      ".cart-product-title"
    ) as NodeListOf<HTMLElement>;
    for (let item of cartItems) {
      if (item.textContent === productTitle) {
        alert("This item is already in the cart");
        return;
      }
    }

    //product details to add into the cart box
    const cartBox: HTMLDivElement = document.createElement("div");
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
    cartContent?.appendChild(cartBox);

    // Setup remove item functionality
    cartBox.querySelector(".cart-remove")?.addEventListener("click", () => {
      cartBox.remove();
      updateCartCount(-1);
      updateTotalPrice();
    });

    //this is the functionality for incrementing and decrementing the no of books in the shopping cart
    cartBox
      .querySelector(".cart-quantity")
      ?.addEventListener("click", (event: Event) => {
        const numberElement = cartBox.querySelector(".number") as HTMLElement;
        const decrementButton = cartBox.querySelector(
          "#decrement"
        ) as HTMLButtonElement;
        let quantity = parseInt(numberElement.textContent || "1", 10);
        const target = event.target as HTMLElement;
        if (target.id === "decrement" && quantity > 1) {
          quantity--;
          if (quantity === 1) {
            decrementButton.style.color = "#999";
          }
        } else if (target.id === "increment") {
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
  const totalPriceElement =
    (document.querySelector(".total-price") as HTMLElement) || null;
  if (!totalPriceElement) return;
  const cartBoxes = document.querySelectorAll(
    ".cart-box"
  ) as NodeListOf<HTMLElement>;
  let total = 0;

  // Calculate total by summing price × quantity for all items
  cartBoxes.forEach((cartBox) => {
    const priceElement =
      (cartBox.querySelector(".cart-price") as HTMLElement) || null;
    const quantityElement =
      (cartBox.querySelector(".number") as HTMLElement) || null;

    if (priceElement && quantityElement) {
      const price = parseFloat(
        priceElement.textContent?.replace("$", "").trim() || "0"
      );
      const quantity = parseInt(quantityElement.textContent?.trim() || "1", 10);
      total += price * quantity;
    }
  });
  totalPriceElement.textContent = `$${total.toFixed(2)}`;
};

//this is the functionality to update the cart count badge that appears in the cart icon
let cartItemCount: number = 0;
const updateCartCount = (change: number) => {
  const cartItemCountBadge =
    (document.querySelector(".cart-item-count") as HTMLElement) || null;
  if (!cartItemCountBadge) return;
  cartItemCount += change;
  if (cartItemCount > 0) {
    cartItemCountBadge.style.visibility = "visible";
    cartItemCountBadge.textContent = cartItemCount.toString();
  } else {
    cartItemCountBadge.style.visibility = "hidden";
    cartItemCountBadge.textContent = "";
  }
};

// Handle "Buy Now" button click to complete purchase
const buyNowButton =
  (document.querySelector(".btn-buy") as HTMLButtonElement) || null;
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
} else {
  console.log("Error: Buy Now button not found.");
}

// Add modal close button event listener
const closeButton = document.querySelector(
  ".close-modal"
) as HTMLElement | null;
if (closeButton) {
  closeButton.addEventListener("click", closeModal);
}

// Add window click event to close modal when clicking outside
window.addEventListener("click", (event) => {
  const bookModal = document.getElementById("bookModal") as HTMLElement | null;
  if (event.target === bookModal) {
    closeModal();
  }
});

// Initialize the app when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  loadBooks();
});

// Automatically load books when the script runs
// loadBooks();
