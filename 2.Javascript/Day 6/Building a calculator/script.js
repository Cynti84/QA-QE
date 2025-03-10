let display = document.getElementById("display");
function displayValue(value) {
  display.value += value;
}
function clearDisplay() {
  display.value = "";
}
function calculateSquare() {
  let value = parseFloat(display.value);
  if (!isNaN(value)) {
    display.value = Math.pow(value, 2);
  }
}

function calculateSquareRoot() {
  let value = parseFloat(display.value);
  if (!isNaN(value)) {
    display.value = Math.sqrt(value);
  }
}

function calculateModulus() {
  display.value += "%"; // This will be handled in calculateResult()
}

function calculateReciprocal() {
  let value = parseFloat(display.value);
  if (!isNaN(value) && value !== 0) {
    display.value = 1 / value;
  } else {
    display.value = "Error";
  }
}
function calculateResult() {
  try {
    display.value = math.evaluate(display.value);
  } catch {
    display.value = "Error";
  }
}
