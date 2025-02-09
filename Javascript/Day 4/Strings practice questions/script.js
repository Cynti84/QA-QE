//Question 1. Check String Input
//JS function to check whether an input is a string or not
function checkString(input) {
  return typeof input == "string";
}
console.log(checkString("w3resource")); // true
console.log(checkString([1, 2, 4, 0])); // false

//Queastion 2. Check Blank String
//JS function to check whether an input is blank or not
function is_Blank(str) {
  return !str || str.trim() === "";
}
console.log(is_Blank("")); // true
console.log(is_Blank("     ")); // true
console.log(is_Blank("Hello")); // false

//Question 3. String to Array of words
//JS function to split a string and convert it into an array of words
function string_to_array(input) {
  return input.split(" ");
}
console.log(string_to_array("Hello World")); // [ 'Hello', 'world' ]

//Question 4. Extract Characters
//JS function to extract a specified number of characters from a string
function truncate_string(str, num) {
  return str.substr(0, num);
}
console.log(truncate_string("Hello World", 8));

//Question 5. Abbreviate Name
//JS function to convert a string into abbreviate name
function abbrev_name(name) {
  let parts = name.trim().split(" ");
  if (parts.length < 2) {
    return name;
  }
  let firstName = parts[0];
  let lastInitial = parts[1][0];
  return firstName + " " + lastInitial + ".";
}
console.log(abbrev_name("Robin Singh")); // Robin S.

//Question 6. Hide Email address
//Js function that hides email addresses to prevent unauthorized access
function protect_email(email) {
  let parts = email.split("@");
  if (parts.length !== 2) {
    return "Invalid Email";
  }
  let firstPart = parts[0];
  let domainName = parts[1];
  let hiddenName = firstPart.substring(0, 2) + "*".repeat(firstPart.length - 2);
  let secureEmail = hiddenName + "@" + domainName;
  return secureEmail;
}
console.log(protect_email("robin_Singh@example.com")); // ro**********@example.com

//Question 7. Parameterize String
//JS function to parameterize a string
function string_parameterize(string) {
  let parametirezedString = string
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-"); // or .split(/\s+/g).join("-")
  return parametirezedString;
}
console.log(string_parameterize("Hello World of Computer Science!!")); //hello-world-of-computer-science

//Question 8. Capitalize the First Letter
//JS function to capitalize the first letter of a string
function capitalize(string) {
  let parts = string.split(" ");
  let capital = parts[0][0].toUpperCase();
  return capital + string.slice(1);
  //alternative method
}
console.log(capitalize("js string exercise")); // Js string exercise

//Question 9. Capitalize each word
//Js function to capitalize the first letter of each word in a string
function capitalize_words(str) {
  let parts = str.split(" ");
  let capitalized = parts
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return capitalized;
}
console.log(capitalize_words("js string exercise"));

//Question 10. Swap Case
//JS function that converts uppercase letters to lowercase and vice versa
function swapCase(str) {
  let parts = str
    .split("")
    .map((char) =>
      char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
    )
    .join("");

  return parts;
}
console.log(swapCase("AaBbCc")); //aAbBcC

//Question 11. Camelize String
//JS function to convert a string into camel case
function camelize(str) {
  let camelCase = str
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  return camelCase;
}
console.log(camelize("java script exercise")); // JavaScriptExercise

//Question 12. Uncamelize String
//JS function to uncamelize a string
function uncamelize(str, separator = " ") {
  let uncamel = str
    .replace(/([a-z])([A-Z])/g, "$1" + separator + "$2")
    .toLowerCase();
  return uncamel;
}
console.log(uncamelize("HelloEveryoneHere")); // Hello everyone here
console.log(uncamelize("HelloEveryoneHere", "-"));

//Question 13. REpeat string
//Js function to concatenate a given string n times
function repeat(str, num = 0) {
  let repeatedString = str.repeat(num);
  return repeatedString;
}
console.log(repeat("Ha!", 4)); // Ha!Ha!Ha!Ha!

//Question 14. Insert a String
//JS function to insert a string within another string at a given position
function insert(main, insert, position = 0) {
  return main.slice(0, position) + insert + main.slice(position);
}
console.log(insert("We are doing some exercises.", "JavaScript ", 18)); // We are doing some JavaScript exercises.

//Question 15. Humanize format
//JS funciton that formats a number with the correct suffix
function humanize_format(num) {
  if (num % 100 >= 11 && num % 100 <= 13) {
    return num + "th";
  }

  let lastDigit = num % 10;
  let suffix =
    lastDigit === 1
      ? "st"
      : lastDigit === 2
      ? "nd"
      : lastDigit === 3
      ? "rd"
      : "th";

  return num + suffix;
}
console.log(humanize_format(301)); // 301st

//Quesiton 16. Truncate string with ellipsis
//JS function to truncate a strin and append
function text_truncate(mainStr, position = 0, truncate) {
  return mainStr.slice(0, position) + truncate;
}
console.log(text_truncate("We are doing JS string exercise.", 13, "!!")); //  We are doing !!

//Question 17. Chop string into chunks
//Js function to chop a string into chunks
function string_chop(str, size) {
  if (size <= 0 || !str) return []; // Handle edge cases
  let result = [];

  for (let i = 0; i < str.length; i += size) {
    result.push(str.slice(i, i + size));
  }

  return result;
}
console.log(string_chop("w3resource", 3));

//Question 18. Count substring occurrences
//JS function to count occurrences of a substring in a string
function count(str, subStr) {
  return str.toLowerCase().split(subStr.toLowerCase()).length - 1;
}
console.log(count("The quick brown fox jumps over the lazy dog", "the")); // Output: 2

//Question 19. Reverse Binary Representation
//JS function that reverses the binary representation of a number and returns its decimal form
function reverse_binary(num) {
  let binary = num.toString(2); // Convert number to binary string
  let reversedBinary = binary.split("").reverse().join(""); // Reverse the binary string
  return parseInt(reversedBinary, 2); // Convert reversed binary back to decimal
}
console.log(reverse_binary(100)); // Expected output: 19

//Question 20. Pad String to Length
//JS function to pad a string to a specified length
function formatted_string(pad, str, direction) {
  str = str.toString(); // Convert number to string if needed
  return direction === "l"
    ? (pad + str).slice(-pad.length) // Left padding
    : (str + pad).slice(0, pad.length); // Right padding
}
console.log(formatted_string("0000", 123, "l")); // Output: "0123"
