let cards = [];
let dealerCards = [];
let dealerSum = 0;
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";

let messageEl = document.querySelector("#message-el");
let sumEl = document.querySelector("#sum-el");
let cardsEl = document.querySelector("#cards-el");
let playerEl = document.querySelector("#player-el");
let dealerEl = document.querySelector("#dealer-el");
let dealerSumEl = document.querySelector("#dealer-sum-el");

let player = {
    name: "Player",
    chips: 100
};

function getRandomCard() {
    let min = 1;
    let max = 11;
    let randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;

    if (randomInteger > 9) {
        return 10;
    } else if (randomInteger === 1) {
        return 11;
    } else {
        return randomInteger;
    }
}

function startGame() {
    if (!isAlive) {
        isAlive = true;

        // Player's cards
        let firstCard = getRandomCard();
        let secondCard = getRandomCard();
        cards = [firstCard, secondCard];
        sum = firstCard + secondCard;

        // Dealer's cards
        dealerCards = [];  // Reset dealer's cards
        dealerSum = 0;     // Reset dealer's sum

        renderGame();
    }
}


function renderGame() {
    playerEl.textContent = player.name + ": CHF " + player.chips;
    cardsEl.textContent = "Cards: ";

    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " -> ";
    }

    sumEl.textContent = "Sum: " + sum;

    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
        endGame();
    } else {
        message = "Bust. You're out of the game!";
        endGame();
    }

    messageEl.textContent = message;

    // Display dealer's cards
    dealerEl.textContent = "Dealer: ";
    for (let i = 0; i < dealerCards.length; i++) {
        dealerEl.textContent += dealerCards[i] + " -> ";
    }
    
    // Update dealer's sum
    dealerSumEl.textContent = "Dealer Sum: " + dealerSum;
}


function newCard() {
    if (isAlive) {
        let newCard = getRandomCard();
        sum += newCard;
        cards.push(newCard);
        renderGame();
    }
}


function stand() {
    if (isAlive && !hasBlackJack) {
        // Draw cards for the dealer only if the "Stand" button is clicked
        while (dealerSum < 17) {
            let newDealerCard = getRandomCard();
            dealerCards.push(newDealerCard);
            dealerSum += newDealerCard;
        }

        // Update dealer's sum
        dealerEl.textContent = "Dealer: ";
        for (let i = 0; i < dealerCards.length; i++) {
            dealerEl.textContent += dealerCards[i] + " -> ";
        }
        
        dealerSumEl.textContent = "Dealer Sum: " + dealerSum;

        determineWinner();
        endGame();
    }
}



function determineWinner() {
    if (sum > dealerSum && sum <= 21 || dealerSum > 21) {
        message = "You win!";
        player.chips += 10;
    } else if (sum === dealerSum) {
        message = "It's a draw!";
    } else {
        message = "You lose!";
        player.chips -= 10;
    }
    endGame();
    messageEl.textContent = message;
}

function endGame() {
    isAlive = false;
    dealerCards = [];
    dealerSum = 0;
    hasBlackJack = false;
}
