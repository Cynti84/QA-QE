document.addEventListener("DOMContentLoaded", function () {
  const productContainer = document.getElementById("product-container");

  // Fetch data from JSON Server
  fetch("http://localhost:3000/products")
    .then((response) => response.json()) // Convert response to JSON
    .then((products) => {
      products.forEach((product) => {
        // Create product div
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        // Create product name
        const name = document.createElement("h2");
        name.textContent = product.name;

        // Create product description
        const description = document.createElement("p");
        description.textContent = product.description;

        // Create product price
        const price = document.createElement("p");
        price.textContent = `Price: $${product.price}`;

        // Create product stock
        const stock = document.createElement("p");
        stock.textContent = `Stock: ${product.stock}`;

        // Append elements to product div
        productDiv.appendChild(name);
        productDiv.appendChild(description);
        productDiv.appendChild(price);
        productDiv.appendChild(stock);

        // Append product div to container
        productContainer.appendChild(productDiv);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
