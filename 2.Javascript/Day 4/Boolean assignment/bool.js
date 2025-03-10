//Bank widthdrawal security system

import bcrypt from "bcryptjs";

//Function for user authentication
function verifyPassword(inputPassword, storedHashedPassword) {
  return bcrypt.compareSync(inputPassword, storedHashedPassword);
}

//Function to verify MFA
function verifyMFA(inputMfaCode, correctMfaCode) {
  return inputMfaCode === correctMfaCode;
}

//Function to check balance
function checkBalance(balance, withdrawalAmount) {
  return balance >= withdrawalAmount;
}

//Function to check daily limit
function checkDailyLimit(withdrawalAmount, dailyLimit) {
  return withdrawalAmount <= dailyLimit;
}

//Function to process withdrawal
function processWithdrawal(
  user,
  inputPassword,
  inputMfaCode,
  withdrawalAmount
) {
  if (!verifyPassword(inputPassword, user.storedHashedPassword)) {
    return "Transaction Failed: Incorrect password";
  }
  if (!verifyMFA(inputMfaCode, user.correctMfaCode)) {
    return "Transaction failed: MFA failed";
  }
  if (!checkBalance(user.balance, withdrawalAmount)) {
    return "Transaction failed: Insufficient balance";
  }
  if (!checkDailyLimit(withdrawalAmount, user.dailyLimit)) {
    return "Transaction failed: Amount exceeds daily limit";
  }
  user.balance -= withdrawalAmount;
  return "Transaction successful! New Balance: " + user.balance;
}
