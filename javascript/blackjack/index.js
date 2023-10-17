
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let gameStarted = false
let message = ""
let messageEl = document.getElementById("message")
let cardsEl = document.getElementById("cardsEl")
let sumEl = document.getElementById("sumEl")

function startGame(){
    // set the game
    if (gameStarted){
        alert("The game has already started. Click New Game to start over")
        return;
    }

    let firstCard = getRandomInt(2, 11)
    let secondCard = getRandomInt(2, 11)
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    isAlive = true
    gameStarted = true
    
    renderGame()
}

function newGame(){
    location.reload()
}

function renderGame(){
    cardsEl.innerText = "Cards:"
    for (let i = 0; i < cards.length; i++){
        cardsEl.innerText += " " + cards[i]
    }
    sumEl.innerText = "Sum: " + sum
    if (sum < 21){
        message = `Do you want to draw a new card? `
    }
    else if (sum === 21) {
        message = "You've got a Blackjack!"
        hasBlackJack = true
    }
    else {
        message = ("BIG L")
        isAlive = false
    }

    messageEl.textContent = message 
}

function newCard(){
    if (isAlive === true && hasBlackJack === false){
        let thirdCard = getRandomInt(2, 11)
        cards.push(thirdCard)
        sum += thirdCard
        renderGame()   
    }
}

// disabled start game and new card button if sum > 21
// disabled new card button if sum = 0