const cardsContainer = document.getElementById("cards");
const cards = document.querySelectorAll("#cards .card");
const scoreDisplay = document.getElementById("scoreDisplay");
const failedAttemptsDisplay = document.getElementById("failedAttempts");
let isTurn = false;
let firstCard = null;
let firstCardImg = "";
let score = 0;
let failedAttempts = 0;
let isTimeoutRunning = false;

const cardsArray = Array.from(cards);
shuffle(cardsArray);
cardsContainer.innerHTML = "";
cardsArray.forEach(card => cardsContainer.appendChild(card));

cards.forEach(card => {
    card.addEventListener("click", () => {
        if (card.getAttribute("matched") != "true" && !isTimeoutRunning) {
            if (!isTurn) {
                isTurn = true;
                card.style.backgroundColor = '#007AE6';
                card.children[0].style.opacity = 1;
                firstCard = card;
            } else {
                isTurn = false;
                const secondCard = card;
                const isMatch = firstCard.children[0].src == secondCard.children[0].src;
                secondCard.style.backgroundColor = '#007AE6';
                secondCard.children[0].style.opacity = 1;
                isTimeoutRunning = true;
                setTimeout(() => {
                    const isMatch = firstCard.children[0].src == secondCard.children[0].src;
                    if (isMatch) {
                        score++;
                        firstCard.setAttribute("matched", "true");
                        secondCard.setAttribute("matched", "true");
                        scoreDisplay.textContent = score;
                    } else {
                        failedAttempts++;
                        firstCard.style.backgroundColor = '#1A93FF';
                        firstCard.children[0].style.opacity = 0;
                        secondCard.style.backgroundColor = '#1A93FF';
                        secondCard.children[0].style.opacity = 0;
                        failedAttemptsDisplay.textContent = failedAttempts;
                    }
                    firstCard = null;
                    isTimeoutRunning = false;
                }, 350);
            }
        }
        if (Array.from(cards).every(card => 
            card.hasAttribute("matched") && card.getAttribute("matched") == "true"
        )) {resetGame(false);}
    });
});

function resetGame(completeReset=true) {
    isTurn = false;
    cards.forEach(card => {
        card.setAttribute("matched", "false");
        card.style.backgroundColor = '#1A93FF';
        card.children[0].style.opacity = 0;
    })
    shuffle(cardsArray);
    cardsContainer.innerHTML = "";
    cardsArray.forEach(card => cardsContainer.appendChild(card));
    if (completeReset) {
        score = 0;
        scoreDisplay.textContent = score;
        failedAttempts = 0;
        failedAttemptsDisplay.textContent = failedAttempts;
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
}