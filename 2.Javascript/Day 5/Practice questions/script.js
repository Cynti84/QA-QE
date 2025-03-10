//Question 1. Check if a string is a Palindrome
//JS function to determine if a given string is a palindrome
function isPalindrome(str) {
    let string = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    let palindrome = string.split("").reverse().join("");
    if (string === palindrome) {
        return true
    }
    else {
        return false
    }

    
}
console.log(isPalindrome('A man, a plan, a canal, Panama')) // true
console.log(isPalindrome('Was it a car or a cat I saw?')) // true
console.log(isPalindrome('Hellow, World!')) // false

//Question 2. Reverse a string
//JS function to reverse a string
function reverseString(str) {
    let reversedStr = str.split("").reverse().join("");
    return reversedStr
}
console.log(reverseString("Hello world of computer science!")) // !ecneics retupmoc fo dlrow olleH

//Question 3. Find the longest Palindromic substring
//Js function to find the longest palindromic substring in a given string

function longestPalindromicSubstring(str) {
    let maxL = 0
    let longestStr = ""

    for (let i = 0; i < str.length; i++)
        for (let j = i; j < str.length; j++){
            const subStr = str.slice(i, j + 1); 
            if (isPalindrome(subStr) && subStr.length > maxL) {
                maxL = subStr.length
                longestStr = subStr
            }
        }
    
    return  longestStr
}
console.log(longestPalindromicSubstring('babad'))

//Question 4. Check if two strings are anagrams
//JS function to check if 2 given strings are anagrams of each other,
//ie if they contain the same characters in the same frequency but in a diff order
function areAnagrams(str1, str2){
    let string1 = str1.toLowerCase().split('').sort().join()
    let string2 = str2.toLowerCase().split('').sort().join()
    if (string1 === string2) {
        return true
    } else {
        return false
    }
}
console.log(areAnagrams('Listen', 'Silent')) // true
console.log(areAnagrams('Hello', 'World')) // false

//Question 5. Remove Duplicates from a string
//JS function to remove duplicate characters from a string while preserving the order
// of the first appearance
function removeDuplicate(str) {
  //1. create a new set from the string
  //2. convert the set back into an array using spread operator
  //3. join them back into a string
  return [...new Set(str)].join(""); // the set object automatically removes dupicate values from a collection, it stores unique values only
}
console.log(removeDuplicate('programming')) // programin
console.log(removeDuplicate('hello world')) // helo wrd
console.log(removeDuplicate('aaabbbccc')) //abc


//Question 6. Count Palindromes in a string
//JS function to count how many distinct palindromes are in a given string.
function countPalindromes(str) {
    
}

//Question 7. Longest common prefix
//Js function to fing the longest common prefix string amongst an array of strings
function longestCommongPrefix(strings) {    
    let prefix = strings[0]
    for (let i = 1; i < strings.length; i++){
        while (!strings[i].startsWith(prefix)) {
            prefix = prefix.slice(0, -1)
            if (prefix === "") return ""
        }
    }
    return prefix
} 
console.log(longestCommongPrefix(['flower', 'flow', 'flight'])) // fl
console.log(longestCommongPrefix(['interspecies', 'interstellar', 'interstate'])) // inters
console.log(longestCommongPrefix(['apple', 'banana', 'cherry'])) // output: ' '

//Question 8. Case sensitive palindrome
//modify the palindrome fn to be case insensitive ie it should ignore upper and lower case differences when checking for a palindrome
function isCaseInsensitivePalindrome(str) {
  let palindrome = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  return palindrome === palindrome.split("").reverse().join("");
  
}
console.log(isCaseInsensitivePalindrome("Aba")); // true
console.log(isCaseInsensitivePalindrome('Racecar')) // true
 console.log(isCaseInsensitivePalindrome('Palindrome')) // false