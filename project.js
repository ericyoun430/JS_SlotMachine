//In terminal put npm init and press enter
//Then do npm i prompt-sync

//Project Outline:

//1. Deposit money to use slot machine

//2. Determine number of lines to bet (max 3)

//3. Collect a bet amount 

//4. Spin slot machine

//5. Check winning

//6. Give or take money

//7. Play again


// //How you create functions
// function deposit() {
//     return 1 
// }

// //const means the value doesn't change
// const x = deposit()

// //New way of writing functions
// const deposit2 = () => {

// }

//This imports it into the program and gives you access
//to the module's functions
const prompt = require("prompt-sync")();


/**
 * Asks user for deposit amount. If invalid value, then reprompts.
 * @returns integer deposit amount
 */
const deposit = () => {

    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ")
        const numberDepositAmount = parseFloat(depositAmount)

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again")
        } else {
            return numberDepositAmount
        }
    }   
}

const depositAmount = deposit()
console.log(depositAmount)