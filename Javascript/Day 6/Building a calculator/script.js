let display = document.getElementById("display");
function displayValue(value) {
  display.value += value;
}
function clearDisplay() {
  display.value = "";
}
function calculateResult() {
  try {
    display.value = math.evaluate(display.value);
  } catch {
    display.value = "Error";
  }
}
