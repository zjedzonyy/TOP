
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

let firstCard = getRandomInt(2, 11)
let secondCard = getRandomInt(2, 11)
let cards = [firstCard, secondCard]
let sum = firstCard + secondCard
let win = false
let isAlive = true
let message = ""
let messageEl = document.getElementById("message")
let cardsEl = document.getElementById("cardsEl")
let sumEl = document.getElementById("sumEl")

function startGame(){
    renderGame()
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
        win = true
    }
    else {
        message = ("BIG L")
        isAlive = false
    }

    messageEl.textContent = message 
}

function newCard(){
    let thirdCard = getRandomInt(2, 11)
    cards.push(thirdCard)
    sum += thirdCard
    renderGame()

    
}
