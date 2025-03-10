import { Book, BooksArray } from "./types.js";

let books: BooksArray = []; //array to store the books
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
function displayBooks(booksToShow: BooksArray) {
  const bookContainer: HTMLElement | null =
    document.getElementById("bookContainer");
  if (!bookContainer) return;
  bookContainer.innerHTML = ""; //this is to clear all books existing books before adding new ones
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
  const bookModal =
    (document.getElementById("bookModal") as HTMLElement) || null;
  if (!bookModal) return;
  bookModal.style.display = "none";
}

//this is a function to filter books by search input
function searchBooks(event: KeyboardEvent) {
  if (event.key === "Enter") {
    //to check if the enter key is pressed. if enter key is pressed, do the following:
    const searchInputElement = document.getElementById(
      "searchInput"
    ) as HTMLInputElement;
    if (!searchInputElement) return;
    const searchInput = searchInputElement.value.toLowerCase();
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

const searchInput = document.getElementById(
  "searchInput"
) as HTMLInputElement | null;
if (!searchInput) {
  console.log("Error searching books");
} else {
  searchInput.addEventListener("keydown", searchBooks);
}

//this is a funcition to filter books by genre
function filterByGenre() {
  const selectedGenreElement = document.getElementById(
    "genreFilter"
  ) as HTMLInputElement | null;
  if (!selectedGenreElement) return;
  const selectedGenre = selectedGenreElement.value;
  const filteredBooks = selectedGenre
    ? books.filter((book) => book.genre === selectedGenre)
    : books;

  displayBooks(filteredBooks);
}

//this is an event listener for filter
const genreFilterElement = document.getElementById(
  "genreFilter"
) as HTMLSelectElement | null;
if (!genreFilterElement) {
  console.log("Error searching books");
} else {
  genreFilterElement.addEventListener("change", filterByGenre);
}

//this is a function to sort the books dynamically
function sortBooks(criteria: keyof Book, order: "asc" | "desc") {
  let sortedBooks: Book[] = [...books];

  sortedBooks.sort((a, b) => {
    if (order === "asc") {
      return (a[criteria] as number) - (b[criteria] as number);
    } else {
      return (b[criteria] as number) - (a[criteria] as number);
    }
  });
  displayBooks(sortedBooks);
}

//event listener for sorting buttons
const sortYear = document.getElementById(
  "sortYear"
) as HTMLButtonElement | null;
if (!sortYear) {
  console.log("Error sorting by year");
} else {
  sortYear.addEventListener("click", function () {
    const currentOrder =
      this.getAttribute("data-order") === "asc" ? "desc" : "asc";
    this.setAttribute("data-order", currentOrder);
    sortBooks("year", currentOrder);
  });
}
const sortPages = document.getElementById("sortPages");
if (!sortPages) {
  console.log("Error sorting by pages");
} else {
  sortPages.addEventListener("click", function () {
    const currentOrder =
      this.getAttribute("data-order") === "asc" ? "desc" : "asc";
    this.setAttribute("data-order", currentOrder);
    sortBooks("pages", currentOrder);
  });
}

// implementing the shopping cart

const cartIcon = document.querySelector("#cart-icon") as HTMLElement | null;
const cart = document.querySelector(".cart") as HTMLElement | null;
const cartClose = document.querySelector("#cart-close") as HTMLElement | null;

cartIcon?.addEventListener("click", () => cart?.classList.add("active"));
cartClose?.addEventListener("click", () => cart?.classList.remove("active"));

//this is the shopping cart function. it contains all the functionalities to add items into the cart,
// remove them, update their number, etc
const ShoppingCart = () => {
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

    //to be able to remove item from the cart
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

//this is a funciton to update the total price of items in the cart
const updateTotalPrice = () => {
  const totalPriceElement =
    (document.querySelector(".total-price") as HTMLElement) || null;
  if (!totalPriceElement) return;
  const cartBoxes = document.querySelectorAll(
    ".cart-box"
  ) as NodeListOf<HTMLElement>;
  let total = 0;

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

//this is the functionality for the 'buy now' button
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

fetchData();
