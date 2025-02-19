document.addEventListener("DOMContentLoaded", function () {
  const user = {
    id: "USER-123456",
    name: {
      first: "Alice",
      last: "Liddell",
    },
    email: "alice@example.com",
    address: {
      shipping: {
        street: "123 Rabbit Hole",
        city: "Wonderland",
        state: "Fantasy",
        postalCode: "12345",
        country: "WL",
      },
      billing: {
        street: "456 Mad Hatter Lane",
        city: "Tea Party",
        state: "Fantasy",
        postalCode: "67890",
        country: "WL",
      },
    },
    payment: {
      total: "100.00",
      currency: "USD",
      details: {
        subtotal: "75.00",
        tax: "15.00",
        shipping: "10.00",
      },
      transactions: [
        {
          id: "TXN-123",
          amount: "50.00",
          description: "Magic Potion",
        },
        {
          id: "TXN-456",
          amount: "50.00",
          description: "Enchanted Sword",
        },
      ],
    },
  };

  //destructuring
  const {
    id: userId,
    name: { first, last },
    email,
    address: {
      shipping: { street, city, state, postalCode, country },
      billing: {
        street: myStreet,
        city: myCity,
        state: myState,
        postalCode: postal,
        country: myCountry,
      },
    },
    payment: {
      total,
      currency,
      details: { subtotal, tax, shipping },
      transactions,
      //[ { id: transactionId1, amount: amount1, description },
      // { id: transactionId2, amount: amount2, description: myDescription },]
    },
  } = user;

  console.log(myCountry);
  //selecting the html sections

  const personalInfo = document.getElementById("personal-info");
  const shippingAddressSection = document.getElementById("shipping-address");
  const billingAddressSection = document.getElementById("billing-address");
  const transactionSection = document.getElementById("transactions");

  //inject the data using template literals

  personalInfo.innerHTML = `<h2>Personal Info</h2><p>Id Number: ${userId}</p><p>Name: ${first} ${last}</p><p> Email: ${email} </p>`;
  shippingAddressSection.innerHTML = `<h2>Shipping Address</h2><p>Street: ${street}, City: ${city}, State: ${state} </p>`;
  billingAddressSection.innerHTML = `<h2>Billing Address</h2><p>${myStreet}, ${myCity}, ${myState}, ${postal} ${myCountry} </p>`;

  transactionSection.innerHTML = `
<h2>Transaction</h2>
<ul>
${transactions
  .map(
    (transaction) => `
  <li>
    <strong>${transaction.id}</strong>: $${transaction.amount} - ${transaction.description}
  </li>`
  )
  .join("")} 
</ul>`;
});
