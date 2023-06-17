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

const ROWS = 3
const COLS = 3
const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
}

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

const spin = () => {
    const symbols = []
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol)
        }
        //console.log(symbol, count)
    }

    const reels = []

    for (let i = 0; i < COLS; i++) {
        reels.push([])
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length)
            const selectedSymbol = reelSymbols[randomIndex]
            reels[i].push(selectedSymbol)
            reelSymbols.splice(randomIndex,1)
        }
    }

    return reels
}



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

const getNumberOfLines = () => {
    while (true) {
        const lines = prompt("Enter number of lines to bet on (1-3): ")
        const numberOfLines = parseFloat(lines)

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again")
        } else {
            return numberOfLines
        }
    }   
}

const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the total bet per line: ")
        const betAmount = parseFloat(bet)

        if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance / lines) {
            console.log("Invalid bet, try again")
        } else {
            return betAmount
        }
    }   
}

const transpose = (reels) => {
    const rows = []

    for (let i = 0; i< ROWS; i++) {
        rows.push([])
        for (let j = 0; j<COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }

    return rows
}

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = ""
        for (const [i, symbol] of row.entries()) {
            rowString+=symbol
            if (i != row.length-1) {
                rowString+= ' | '
            }
            
        }
        console.log(rowString)
    }
}

const getWinnings = (rows,bet,lines) => {
    let winnings = 0

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row]
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false
                break
            }
        }

        if (allSame) {
            winnings+= bet*SYMBOL_VALUES[symbols[0]]
        }
    }

    return winnings
}

const game = () => {
    let balance = deposit()

    while (true) {
        console.log("You have a balance of $" + balance)
        const numberOfLines = getNumberOfLines()
        const bet = getBet(balance,numberOfLines)
        balance-=bet*numberOfLines
        const reels = spin()
        const rows = transpose(reels)
        printRows(rows)
        const winning = getWinnings(rows,bet,numberOfLines)
        console.log("You won, $" + winning.toString())
        balance+=winning

        if (balance <= 0) {
            console.log("You have no more money! You're kicked out.")
            break
        }

        const playAgain = prompt("Do you want to play again (y/n)")

        if (playAgain != "y") {
            break
        }
    }
}

game()


